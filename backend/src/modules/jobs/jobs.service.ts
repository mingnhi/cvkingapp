import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Job, JobStatus } from '../../entities/job.entity';
import { CreateJobDto } from './dtos/create-job.dto';
import { JobQueryDto } from './dtos/job-query.dto';
import { Company } from '../../entities/company.entity';
import { JobCategory } from '../../entities/job-category.entity';
import { Skill } from '../../entities/skill.entity';
import { JobTag } from '../../entities/job-tag.entity';
import { Users } from '../../entities/user.entity';
import { JobViewsService } from '../job-views/job-views.service';
import { JobsRepository } from './jobs.repository';
// Removed constants import

@Injectable()
export class JobsService {
  [x: string]: any;
  constructor(
    private readonly jobsRepository: JobsRepository,
    @InjectRepository(Company)
    private readonly companyRepository: EntityRepository<Company>,
    @InjectRepository(JobCategory)
    private readonly jobCategoryRepository: EntityRepository<JobCategory>,
    @InjectRepository(Skill)
    private readonly skillRepository: EntityRepository<Skill>,
    @InjectRepository(JobTag)
    private readonly jobTagRepository: EntityRepository<JobTag>,
    private readonly em: EntityManager,
    private readonly jobViewsService: JobViewsService
  ) {}

  async create(createJobDto: CreateJobDto, postedBy: Users): Promise<Job> {
    const {
      companyId,
      categoryId,
      skills: skillNames,
      tags: tagNames,
      ...rest
    } = createJobDto;

    const company = await this.companyRepository.findOneOrFail(companyId.toString());
    const category = categoryId
      ? await this.jobCategoryRepository.findOneOrFail({ JobCategoryId: categoryId })
      : undefined;

    const job = await this.jobsRepository.create({
      ...rest,
      company,
      category,
      postedBy,
    });

    if (skillNames) {
      for (const name of skillNames) {
        let skill = await this.skillRepository.findOne({ Name: name });
        if (!skill) {
          skill = this.skillRepository.create({ Name: name });
          await this.em.persistAndFlush(skill);
        }
        job.skills.add(skill);
      }
    }

    if (tagNames) {
      for (const name of tagNames) {
        let tag = await this.jobTagRepository.findOne({ Name: name });
        if (!tag) {
          tag = this.jobTagRepository.create({ Name: name });
          await this.em.persistAndFlush(tag);
        }
        job.tags.add(tag);
      }
    }

    await this.jobsRepository.persistAndFlush(job);
    return job;
  }

  async findOne(
    id: number,
    user?: Users,
    sessionId?: string
  ): Promise<Job | null> {
    const job = await this.jobsRepository.findOne(id, {
      populate: ['company', 'category', 'skills', 'tags', 'postedBy'],
    });

    if (job) {
      // Track view
      await this.jobViewsService.trackView(id.toString(), user, sessionId);
    }

    return job;
  }

  async findAll(query: JobQueryDto): Promise<{ jobs: Job[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      search,
      location,
      jobType,
      categoryId,
      skills,
      tags,
      salaryMin,
      salaryMax,
      status = JobStatus.ACTIVE,
      sortBy = 'postedAt',
      sortOrder = 'DESC',
    } = query;

    const offset = (page - 1) * limit;
    const where: any = { status };

    // Search in title and description
    if (search) {
      where.$or = [
        { title: { $ilike: `%${search}%` } },
        { description: { $ilike: `%${search}%` } },
        { shortDescription: { $ilike: `%${search}%` } },
      ];
    }

    if (location) {
      where.location = { $ilike: `%${location}%` };
    }

    if (jobType) {
      where.jobType = jobType;
    }

    if (categoryId) {
      where.category = categoryId;
    }

    if (salaryMin) {
      where.salaryMin = { $gte: salaryMin };
    }

    if (salaryMax) {
      where.salaryMax = { $lte: salaryMax };
    }

    if (skills && skills.length > 0) {
      where.skills = { Name: { $in: skills } };
    }

    if (tags && tags.length > 0) {
      where.tags = { Name: { $in: tags } };
    }

    const [jobs, total] = await this.jobsRepository.findAll(where, {
      populate: ['company', 'category', 'skills', 'tags', 'postedBy'],
      limit,
      offset,
      orderBy: { [sortBy]: sortOrder },
    });

    return { jobs, total };
  }

  async findPopular(limit: number = 10): Promise<Job[]> {
    return this.jobsRepository.find(
      { status: JobStatus.ACTIVE },
      {
        populate: ['company', 'category'],
        orderBy: { viewsCount: 'DESC' },
        limit,
      }
    );
  }

  async findRecent(limit: number = 10): Promise<Job[]> {
    return this.jobsRepository.find(
      { status: JobStatus.ACTIVE },
      {
        populate: ['company', 'category'],
        orderBy: { postedAt: 'DESC' },
        limit,
      }
    );
  }

  async findByCompany(
    companyId: string,
    query: JobQueryDto
  ): Promise<{ jobs: Job[]; total: number }> {
    const { page = 1, limit = 10, status = JobStatus.ACTIVE } = query;
    const offset = (page - 1) * limit;

    const where: any = {
      company: companyId,
      status,
    };

    const [jobs, total] = await this.jobsRepository.findAll(where, {
      populate: ['company', 'category', 'skills', 'tags'],
      limit,
      offset,
      orderBy: { postedAt: 'DESC' },
    });

    return { jobs, total };
  }

  async update(
    id: number,
    updateJobDto: Partial<CreateJobDto>,
    user: Users
  ): Promise<Job> {
    const job = await this.jobsRepository.findOneOrFail(id, {
      populate: ['company'],
    });

    // Check if user is the one who posted the job or is admin
    const userWithRoles = await this.em.findOneOrFail(Users, user.id, {
      populate: ['roles'],
    });
    const isAdmin = userWithRoles.roles
      ?.getItems()
      .some(role => role.RoleName === 'Admin');
    if (!isAdmin && job.postedBy?.id !== user.id) {
      throw new Error('You can only update your own jobs');
    }

    const {
      companyId,
      categoryId,
      skills: skillNames,
      tags: tagNames,
      ...rest
    } = updateJobDto;

    if (companyId) {
      job.company = await this.companyRepository.findOneOrFail(companyId.toString());
    }

    if (categoryId) {
      job.category = await this.jobCategoryRepository.findOneOrFail({ JobCategoryId: categoryId });
    }

    // Update skills
    if (skillNames) {
      job.skills.removeAll();
      for (const name of skillNames) {
        let skill = await this.skillRepository.findOne({ Name: name });
        if (!skill) {
          skill = this.skillRepository.create({ Name: name });
          await this.em.persistAndFlush(skill);
        }
        job.skills.add(skill);
      }
    }

    // Update tags
    if (tagNames) {
      job.tags.removeAll();
      for (const name of tagNames) {
        let tag = await this.jobTagRepository.findOne({ Name: name });
        if (!tag) {
          tag = this.jobTagRepository.create({ Name: name });
          await this.em.persistAndFlush(tag);
        }
        job.tags.add(tag);
      }
    }

    Object.assign(job, rest);
    job.UpdatedAt = new Date();

    await this.jobsRepository.persistAndFlush(job);
    return job;
  }

  async remove(id: number, user: Users): Promise<void> {
    const job = await this.em.findOneOrFail(Job, { JobId: id });

    // Check if user is the one who posted the job or is admin
    const userWithRoles = await this.em.findOneOrFail(Users, user.id, {
      populate: ['roles'],
    });
    const isAdmin = userWithRoles.roles
      ?.getItems()
      .some(role => role.RoleName === 'Admin');
    if (!isAdmin && job.postedBy?.id !== user.id) {
      throw new Error('You can only delete your own jobs');
    }

    await this.jobsRepository.removeAndFlush(job);
  }

  async getJobStats(jobId: number, user: Users): Promise<any> {
    const job = await this.em.findOneOrFail(Job, { JobId: jobId }, {
      populate: ['company'],
    });

    // Check if user is employer for this job
    const userWithRoles = await this.em.findOneOrFail(Users, user.id, {
      populate: ['roles'],
    });
    const isEmployer = userWithRoles.roles
      ?.getItems()
      .some(role => role.RoleName === 'Employer');
    if (!isEmployer || job.company.postedBy?.id !== user.id) {
      throw new Error('You can only view stats for your own jobs');
    }

    const views = await this.jobViewsService.getJobViews(jobId.toString(), user);

    return {
      viewsCount: job.ViewsCount,
      totalViews: views.total,
      recentViews: views.views.slice(0, 10),
    };
  }
}
