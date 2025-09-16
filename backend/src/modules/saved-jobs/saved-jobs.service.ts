import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { SavedJob } from '../../entities/saved-job.entity';
import { Job } from '../../entities/job.entity';
import { Users } from '../../entities/user.entity';
import { SavedJobQueryDto } from './dtos/saved-job-query.dto';

@Injectable()
export class SavedJobsService {
  constructor(
    @InjectRepository(SavedJob)
    private readonly savedJobRepository: EntityRepository<SavedJob>,
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    private readonly em: EntityManager
  ) {}

  async saveJob(jobId: string, user: Users): Promise<SavedJob> {
    // Check if job exists
    const job = await this.jobRepository.findOneOrFail(jobId);

    // Check if already saved
    const existingSavedJob = await this.savedJobRepository.findOne({
      job: jobId,
      jobSeeker: user.id,
    });

    if (existingSavedJob) {
      throw new ConflictException('Job is already saved');
    }

    const savedJob = this.savedJobRepository.create({
      job,
      jobSeeker: user,
    });

    await this.em.persistAndFlush(savedJob);
    return savedJob;
  }

  async findAll(
    query: SavedJobQueryDto,
    user: Users
  ): Promise<{ savedJobs: SavedJob[]; total: number }> {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const [savedJobs, total] = await this.savedJobRepository.findAndCount(
      { jobSeeker: user.id },
      {
        populate: [
          'job',
          'job.company',
          'job.category',
          'job.skills',
          'job.tags',
        ],
        limit,
        offset,
        orderBy: { savedAt: 'DESC' },
      }
    );

    return { savedJobs, total };
  }

  async findOne(id: string, user: Users): Promise<SavedJob> {
    const savedJob = await this.savedJobRepository.findOne(id, {
      populate: [
        'job',
        'job.company',
        'job.category',
        'job.skills',
        'job.tags',
      ],
    });

    if (!savedJob) {
      throw new NotFoundException('Saved job not found');
    }

    if (savedJob.jobSeeker.id !== user.id) {
      throw new NotFoundException('Saved job not found');
    }

    return savedJob;
  }

  async remove(id: string, user: Users): Promise<void> {
    const savedJob = await this.findOne(id, user);
    await this.em.removeAndFlush(savedJob);
  }

  async removeByJobId(jobId: string, user: Users): Promise<void> {
    const savedJob = await this.savedJobRepository.findOne({
      job: jobId,
      jobSeeker: user.id,
    });

    if (!savedJob) {
      throw new NotFoundException('Saved job not found');
    }

    await this.em.removeAndFlush(savedJob);
  }

  async isJobSaved(jobId: string, user: Users): Promise<boolean> {
    const savedJob = await this.savedJobRepository.findOne({
      job: jobId,
      jobSeeker: user.id,
    });

    return !!savedJob;
  }
}


