import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { JobsRepository } from './jobs.repository';
import { CreateJobDto } from './dtos/create-job.dto';
import { Job } from '../../entities/job.entity';
import { Skill } from '../../entities/skill.entity';
import { JobTag } from '../../entities/job-tag.entity';
import { JobSkills } from '../../entities/job-skills.entity';
import { JobJobTags } from '../../entities/job-job-tags.entity';
// import { Users } from '../../entities/user.entity';

@Injectable()
export class JobsService {
  constructor(
    private readonly jobsRepository: JobsRepository,
    private readonly em: EntityManager,
    @InjectRepository(Skill)
    private readonly skillRepository: EntityRepository<Skill>,
    @InjectRepository(JobTag)
    private readonly jobTagRepository: EntityRepository<JobTag>,
    @InjectRepository(JobSkills)
    private readonly jobSkillsRepository: EntityRepository<JobSkills>,
    @InjectRepository(JobJobTags)
    private readonly jobJobTagsRepository: EntityRepository<JobJobTags>
  ) {}

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

  /**
   * Find a job by slug
   * @param slug Slug of the job
   * @returns Job or null if not found
   */
  async findBySlug(slug: string): Promise<Job | null> {
    return this.jobsRepository.findBySlug(slug);
  }
}
