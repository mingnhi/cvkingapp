import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Job } from '../../entities/job.entity';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all jobs
   * @returns List of all jobs
   */
  async findAll(query?: object): Promise<Job[]> {
    const results = await this.em.getConnection().execute('EXEC SP_GetAllJob');
    let data: any;
    if (Array.isArray(results) && results.length > 0 && typeof results[0] === 'string') {
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
  async create(createJobDto: CreateJobDto): Promise<Job> {
    const { skills, tags, ...jobData } = createJobDto;
    const skillsStr = Array.isArray(skills) ? skills.join(',') : '';
    const tagsStr = Array.isArray(tags) ? tags.join(',') : '';

    const results = await this.em
      .getConnection()
      .execute(
        'EXEC SP_InsertJob ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?',
        [
          jobData.companyId, // CompanyId
          null, // PostedByUserId (optional)
          jobData.title, // Title
          jobData.title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, ''), // Slug (generated from title)
          jobData.shortDescription, // ShortDescription
          jobData.description, // Description
          jobData.requirements, // Requirements
          jobData.benefits, // Benefits
          jobData.salaryMin, // SalaryMin
          jobData.salaryMax, // SalaryMax
          jobData.currency, // Currency
          jobData.jobType, // JobType
          jobData.location, // Location
          jobData.categoryId, // CategoryId
          jobData.status || 'Active', // Status
          0, // ViewsCount
          null, // PostedAt (auto-generated in SP)
          jobData.expiresAt, // ExpiresAt
          skillsStr, // Skills
          tagsStr, // Tags
        ]
      );

    let data: any;
    if (Array.isArray(results) && results.length > 0 && typeof results[0] === 'string') {
      data = JSON.parse(results[0] as string);
    } else if (typeof results === 'string') {
      data = JSON.parse(results);
    } else {
      data = results ?? [];
    }

    return data?.length > 0 ? data[0] : null;
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
    if (Array.isArray(results) && results.length > 0 && typeof results[0] === 'string') {
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
