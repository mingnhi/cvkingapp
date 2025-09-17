import { Injectable, NotFoundException } from '@nestjs/common';
import { JobsRepository } from './jobs.repository';
import { CreateJobDto } from './dtos/create-job.dto';
import { Job } from '../../entities/job.entity';
import { Users } from '../../entities/user.entity';

@Injectable()
export class JobsService {
  constructor(private readonly jobsRepository: JobsRepository) {}

  /**
   * Retrieve all jobs
   * @returns List of all jobs
   */
  async findAll(): Promise<Job[]> {
    return this.jobsRepository.findAll();
  }

  /**
   * Find a job by ID
   * @param id ID of the job
   * @returns Job or null if not found
   */
  async findOne(id: string): Promise<Job | null> {
    return this.jobsRepository.findOne(id);
  }

  /**
   * Create a new job
   * @param createJobDto Data to create the job
   * @returns Created job
   */
  async create(createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsRepository.create(createJobDto);
  }

  /**
   * Update a job
   * @param updateJobDto Data to update the job
   * @returns Updated job or null if not found
   */
  async update(updateJobDto: any): Promise<Job | null> {
    return this.jobsRepository.update(updateJobDto);
  }

  /**
   * Delete a job
   * @param id ID of the job to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    return this.jobsRepository.delete(id);
  }
}
