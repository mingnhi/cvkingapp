import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Job } from '../../entities/job.entity';
import { CreateJobDto } from './dtos/create-job.dto';
import { JobQueryDto } from './dtos/job-query.dto';

interface UpdateJobDto {
  id: number;
  title?: string;
  shortDescription?: string;
  description?: string;
}

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all jobs with optional filtering
   * @param where Filter conditions
   * @param options Query options (populate, limit, offset, orderBy)
   * @returns List of jobs and total count
   */
  async findAll(where?: any, options?: any): Promise<[Job[], number]> {
    const { populate, limit, offset, orderBy } = options || {};

    const [jobs, total] = await this.jobRepository.findAndCount(where || {}, {
      populate: populate || [],
      limit,
      offset,
      orderBy,
    });

    return [jobs, total];
  }

  /**
   * Find a job by ID
   * @param id ID of the job
   * @param options Query options
   * @returns Job or null if not found
   */
  async findOne(id: number, options?: any): Promise<Job | null> {
    const { populate } = options || {};
    return await this.jobRepository.findOne({ JobId: id }, {
      populate: populate || [],
    });
  }

  /**
   * Create a new job
   * @param createJobDto Data to create the job
   * @returns Created job
   */
  async create(createJobDto: Partial<CreateJobDto> & { company?: any; category?: any; postedBy?: any }): Promise<Job> {
    const job = this.jobRepository.create(createJobDto);
    await this.em.persistAndFlush(job);
    return job;
  }

  /**
   * Update a job
   * @param updateJobDto Data to update the job
   * @returns Updated job or null if not found
   */
  async update(updateJobDto: UpdateJobDto): Promise<Job | null> {
    const job = await this.jobRepository.findOne({ JobId: updateJobDto.id });
    if (!job) return null;

    Object.assign(job, updateJobDto);
    job.UpdatedAt = new Date();
    await this.em.persistAndFlush(job);

    return job;
  }

  /**
   * Delete a job
   * @param id ID of the job to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: number): Promise<boolean> {
    const job = await this.jobRepository.findOne({ JobId: id });
    if (!job) return false;

    await this.em.removeAndFlush(job);
    return true;
  }

  /**
   * Find jobs using where conditions
   * @param where Filter conditions
   * @param options Query options
   * @returns List of jobs
   */
  async find(where: any, options?: any): Promise<Job[]> {
    const { populate, limit, offset, orderBy } = options || {};
    return await this.jobRepository.find(where, {
      populate: populate || [],
      limit,
      offset,
      orderBy,
    });
  }

  /**
   * Find one job or fail
   * @param id Job ID
   * @param options Query options
   * @returns Job
   */
  async findOneOrFail(id: number, options?: any): Promise<Job> {
    const job = await this.findOne(id, options);
    if (!job) {
      throw new Error(`Job with id ${id} not found`);
    }
    return job;
  }

  /**
   * Persist and flush an entity
   * @param entity Entity to persist
   */
  async persistAndFlush(entity: any): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

  /**
   * Remove and flush an entity
   * @param entity Entity to remove
   */
  async removeAndFlush(entity: any): Promise<void> {
    await this.em.removeAndFlush(entity);
  }
}
