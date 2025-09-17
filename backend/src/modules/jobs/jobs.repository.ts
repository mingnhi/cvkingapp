import { JobSkillsRepository } from './../job-skills/job-skills.repository';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Job } from '../../entities/job.entity';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobJobTags } from '@entities/job-job-tags.entity';
import { Skill } from '@entities/skill.entity';
import { JobSkills } from '@entities/job-skills.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    @InjectRepository(JobJobTags)
    private readonly jobJobTagsRepository: EntityRepository<JobJobTags>,
    @InjectRepository(JobSkills)
    private readonly jobSkillsRepository: EntityRepository<JobSkills>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all jobs
   * @returns List of all jobs
   */
  async findAll(query?: object): Promise<Job[]> {
    const results = await this.em.getConnection().execute('EXEC SP_GetAllJob');
    let data: any;
    if (
      Array.isArray(results) &&
      results.length > 0 &&
      typeof results[0] === 'string'
    ) {
      // If results is an array with a JSON string
      data = JSON.parse(results[0] as string);
    } else if (typeof results === 'string') {
      data = JSON.parse(results);
    } else {
      data = results ?? [];
    }
    return data;
  }

  /**
   * Find a job by ID
   * @param id ID of the job
   * @returns Job or null if not found
   */
  async findOne(id: string): Promise<Job | null> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobById ?', [id]);
    const job = result?.[0] ?? result;
    return job ?? null;
  }

  /**
   * Create a new job
   * @param createJobDto Data to create the job
   * @returns Created job
   */
  async create(createJobDto: CreateJobDto): Promise<any> {
    console.log('skills', createJobDto.skills);
    console.log('tags', createJobDto.tags);

    const results = await this.em
      .getConnection()
      .execute(
        'EXEC SP_InsertJob ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?',
        [
          createJobDto.companyId, // CompanyId
          createJobDto.userId, // PostedByUserId (optional)
          createJobDto.title, // Title
          createJobDto.shortDescription, // ShortDescription
          createJobDto.description, // Description
          createJobDto.requirements, // Requirements
          createJobDto.benefits, // Benefits
          createJobDto.salaryMin, // SalaryMin
          createJobDto.salaryMax, // SalaryMax
          createJobDto.currency, // Currency
          createJobDto.jobType, // JobType
          createJobDto.location, // Location
          createJobDto.categoryId, // CategoryId
          createJobDto.status || 'Active', // Status
          0, // ViewsCount
          createJobDto.expiresAt, // ExpiresAtags
        ]
      );
    for (let skill of createJobDto.skills) {
      this.jobSkillsRepository.create({
        id: uuidv4(),
        jobId: results[0].JobId,
        skillId: skill,
        createdAt: new Date(),
        updatedAt: null,
      });
    }
    for (let tag of createJobDto.tags) {
      this.jobJobTagsRepository.create({
        id: uuidv4(),
        jobId: results[0].JobId,
        jobTagId: tag,
        createdAt: new Date(),
        updatedAt: null,
      });
    }
    await this.em.flush();
    return results[0];
  }

  /**
   * Update a job
   * @param updateJobDto Data to update the job
   * @returns Updated job or null if not found
   */
  async update(updateJobDto: UpdateJobDto): Promise<Job | null> {
    const results = await this.em
      .getConnection()
      .execute(
        'EXEC SP_UpdateJob ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?',
        [
          updateJobDto.id, // JobId
          updateJobDto.companyId, // CompanyId
          updateJobDto.postedByUserId, // PostedByUserId
          updateJobDto.title, // Title
          updateJobDto.slug, // Slug
          updateJobDto.shortDescription, // ShortDescription
          updateJobDto.description, // Description
          updateJobDto.requirements, // Requirements
          updateJobDto.benefits, // Benefits
          updateJobDto.salaryMin, // SalaryMin
          updateJobDto.salaryMax, // SalaryMax
          updateJobDto.currency, // Currency
          updateJobDto.jobType, // JobType
          updateJobDto.location, // Location
          updateJobDto.categoryId, // CategoryId
          updateJobDto.status, // Status
          updateJobDto.viewsCount, // ViewsCount
          updateJobDto.postedAt, // PostedAt
          updateJobDto.expiresAt, // ExpiresAt
          updateJobDto.skills ? updateJobDto.skills.join(',') : '', // Skills string
          updateJobDto.tags ? updateJobDto.tags.join(',') : '', // Tags string
        ]
      );
    let data: any;
    if (
      Array.isArray(results) &&
      results.length > 0 &&
      typeof results[0] === 'string'
    ) {
      data = JSON.parse(results[0] as string);
    } else if (typeof results === 'string') {
      data = JSON.parse(results);
    } else {
      data = results ?? [];
    }
    return data?.length > 0 ? data[0] : null;
  }

  /**
   * Delete a job
   * @param id ID of the job to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteJob ?', [id]);
    return true;
  }

  async findBySlug(slug: string): Promise<Job | null> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobBySlug ?', [slug]);
    const job = result?.[0] ?? result;
    return job ?? null;
  }
}
