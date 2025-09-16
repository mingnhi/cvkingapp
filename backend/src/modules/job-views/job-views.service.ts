import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { JobView } from '../../entities/job-view.entity';
import { Job, JobStatus } from '../../entities/job.entity';
import { Users } from '../../entities/user.entity';

@Injectable()
export class JobViewsService {
  constructor(
    @InjectRepository(JobView)
    private readonly jobViewRepository: EntityRepository<JobView>,
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    private readonly em: EntityManager
  ) {}

  async trackView(
    jobId: string,
    user?: Users,
    sessionId?: string
  ): Promise<void> {
    // Check if job exists
    await this.jobRepository.findOneOrFail({ JobId: parseInt(jobId) });

    // Check if view already exists for this user/session in the last hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const jobInt = await this.jobRepository.findOneOrFail({ JobId: parseInt(jobId) });

    const existingView = await this.jobViewRepository.findOne({
      job: jobInt,
      $or: [{ viewer: user }, { sessionId }],
      viewedAt: { $gte: oneHourAgo },
    });

    if (existingView) {
      return; // Don't track duplicate views
    }

    const jobView = this.jobViewRepository.create({
      job: jobInt,
      viewer: user,
      sessionId,
    });

    await this.em.persistAndFlush(jobView);

    // Update job views count
    const jobToUpdate = await this.jobRepository.findOneOrFail({ JobId: parseInt(jobId) });
    jobToUpdate.ViewsCount += 1;
    await this.em.persistAndFlush(jobToUpdate);
  }

  async getJobViews(
    jobId: string,
    user: Users
  ): Promise<{ views: JobView[]; total: number }> {
    // Check if user is employer for this job
    const job = await this.jobRepository.findOneOrFail({ JobId: parseInt(jobId) }, {
      populate: ['company'],
    });

    const userWithRoles = await this.em.findOneOrFail(Users, user.id, {
      populate: ['roles'],
    });
    const isEmployer = userWithRoles.roles
      ?.getItems()
      .some(role => role.name === 'Employer');
    if (!isEmployer || job.company.postedBy?.id !== user.id) {
      throw new Error('You can only view stats for your own jobs');
    }

    const [views, total] = await this.jobViewRepository.findAndCount(
      { job: job },
      {
        populate: ['viewer'],
        orderBy: { viewedAt: 'DESC' },
      }
    );

    return { views, total };
  }

  async getPopularJobs(limit: number = 10): Promise<Job[]> {
    return this.jobRepository.find(
      { Status: JobStatus.ACTIVE },
      {
        populate: ['company', 'category'],
        orderBy: { ViewsCount: 'DESC' },
        limit,
      }
    );
  }
}
