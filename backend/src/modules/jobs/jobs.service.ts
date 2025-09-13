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

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
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

    const company = await this.companyRepository.findOneOrFail(companyId);
    const category = categoryId
      ? await this.jobCategoryRepository.findOneOrFail(categoryId)
      : undefined;

    const job = this.jobRepository.create({
      ...rest,
      company,
      category,
      postedBy,
    });

    if (skillNames) {
      for (const name of skillNames) {
        let skill = await this.skillRepository.findOne({ name });
        if (!skill) {
          skill = this.skillRepository.create({ name });
          await this.em.persistAndFlush(skill);
        }
        job.skills.add(skill);
      }
    }

    if (tagNames) {
      for (const name of tagNames) {
        let tag = await this.jobTagRepository.findOne({ name });
        if (!tag) {
          tag = this.jobTagRepository.create({ name });
          await this.em.persistAndFlush(tag);
        }
        job.tags.add(tag);
      }
    }

    await this.em.persistAndFlush(job);
    return job;
  }

  async findOne(
    id: string,
    user?: Users,
    sessionId?: string
  ): Promise<Job | null> {
    const job = await this.jobRepository.findOne(id, {
      populate: ['company', 'category', 'skills', 'tags', 'postedBy'],
    });

    if (job) {
      // Track view
      await this.jobViewsService.trackView(id, user, sessionId);
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
      where.skills = { name: { $in: skills } };
    }

    if (tags && tags.length > 0) {
      where.tags = { name: { $in: tags } };
    }

    const [jobs, total] = await this.jobRepository.findAndCount(where, {
      populate: ['company', 'category', 'skills', 'tags', 'postedBy'],
      limit,
      offset,
      orderBy: { [sortBy]: sortOrder },
    });

    return { jobs, total };
  }

  async findPopular(limit: number = 10): Promise<Job[]> {
    return this.jobRepository.find(
      { status: JobStatus.ACTIVE },
      {
        populate: ['company', 'category'],
        orderBy: { viewsCount: 'DESC' },
        limit,
      }
    );
  }

  async findRecent(limit: number = 10): Promise<Job[]> {
    return this.jobRepository.find(
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

    const [jobs, total] = await this.jobRepository.findAndCount(where, {
      populate: ['company', 'category', 'skills', 'tags'],
      limit,
      offset,
      orderBy: { postedAt: 'DESC' },
    });

    return { jobs, total };
  }

  async update(
    id: string,
    updateJobDto: Partial<CreateJobDto>,
    user: Users
  ): Promise<Job> {
    const job = await this.jobRepository.findOneOrFail(id, {
      populate: ['company'],
    });

    // Check if user is the one who posted the job or is admin
    const userWithRoles = await this.em.findOneOrFail(Users, user.id, {
      populate: ['roles'],
    });
    const isAdmin = userWithRoles.roles
      ?.getItems()
      .some(role => role.name === 'Admin');
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
      job.company = await this.companyRepository.findOneOrFail(companyId);
    }

    if (categoryId) {
      job.category = await this.jobCategoryRepository.findOneOrFail(categoryId);
    }

    // Update skills
    if (skillNames) {
      job.skills.removeAll();
      for (const name of skillNames) {
        let skill = await this.skillRepository.findOne({ name });
        if (!skill) {
          skill = this.skillRepository.create({ name });
          await this.em.persistAndFlush(skill);
        }
        job.skills.add(skill);
      }
    }

    // Update tags
    if (tagNames) {
      job.tags.removeAll();
      for (const name of tagNames) {
        let tag = await this.jobTagRepository.findOne({ name });
        if (!tag) {
          tag = this.jobTagRepository.create({ name });
          await this.em.persistAndFlush(tag);
        }
        job.tags.add(tag);
      }
    }

    Object.assign(job, rest);
    job.updatedAt = new Date();

    await this.em.persistAndFlush(job);
    return job;
  }

  async remove(id: string, user: Users): Promise<void> {
    const job = await this.jobRepository.findOneOrFail(id);

    // Check if user is the one who posted the job or is admin
    const userWithRoles = await this.em.findOneOrFail(Users, user.id, {
      populate: ['roles'],
    });
    const isAdmin = userWithRoles.roles
      ?.getItems()
      .some(role => role.name === 'Admin');
    if (!isAdmin && job.postedBy?.id !== user.id) {
      throw new Error('You can only delete your own jobs');
    }

    await this.em.removeAndFlush(job);
  }

  async getJobStats(jobId: string, user: Users): Promise<any> {
    const job = await this.jobRepository.findOneOrFail(jobId, {
      populate: ['company'],
    });

    // Check if user is employer for this job
    const userWithRoles = await this.em.findOneOrFail(Users, user.id, {
      populate: ['roles'],
    });
    const isEmployer = userWithRoles.roles
      ?.getItems()
      .some(role => role.name === 'Employer');
    if (!isEmployer || job.company.postedBy?.id !== user.id) {
      throw new Error('You can only view stats for your own jobs');
    }

    const views = await this.jobViewsService.getJobViews(jobId, user);

    return {
      viewsCount: job.viewsCount,
      totalViews: views.total,
      recentViews: views.views.slice(0, 10),
    };
  }
}
