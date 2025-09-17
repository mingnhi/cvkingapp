import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Job } from '../../entities/job.entity';
import { CreateJobDto } from './dtos/create-job.dto';

interface UpdateJobDto {
  id: string;
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
   * Retrieve all jobs
   * @returns List of all jobs
   */
  async findAll(): Promise<Job[]> {
    const results = await this.em.getConnection().execute('EXEC SP_GetAllJob');
    return results ?? [];
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
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_PostJob ?, ?, ?, ?, ?, ?, ?', [
        createJobDto.title,
        createJobDto.slug,
        createJobDto.shortDescription,
        createJobDto.description,
        createJobDto.location,
        createJobDto.salaryMin,
        createJobDto.salaryMax,
      ]);

    const newJob = result?.[0] ?? result;
    return newJob as Job;
  }

  /**
   * Update a job
   * @param updateJobDto Data to update the job
   * @returns Updated job or null if not found
   */
  async update(updateJobDto: UpdateJobDto): Promise<Job | null> {
    await this.em
      .getConnection()
      .execute('EXEC SP_UpdateJob ?, ?, ?, ?', [
        updateJobDto.id,
        updateJobDto.title,
        updateJobDto.shortDescription,
        updateJobDto.description,
      ]);
    return this.findOne(updateJobDto.id);
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

  /**
   * Find jobs using ORM
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
