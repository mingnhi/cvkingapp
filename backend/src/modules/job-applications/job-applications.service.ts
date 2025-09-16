import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { JobApplication } from '../../entities/job-application.entity';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { Users } from '../../entities/user.entity';
import { Job } from '../../entities/job.entity';
import { JobApplicationsRepository } from './job-applications.repository';

@Injectable()
export class JobApplicationsService {
  constructor(
    private readonly jobApplicationsRepository: JobApplicationsRepository,
    @InjectRepository(Users)
    private readonly userRepository: EntityRepository<Users>,
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    private readonly em: EntityManager
  ) {}

  async create(
    createJobApplicationDto: CreateJobApplicationDto,
    user: Users
  ): Promise<JobApplication> {
    const job = await this.jobRepository.findOneOrFail({
      JobId: parseInt(createJobApplicationDto.jobId),
    });

    const jobApplication = this.jobApplicationsRepository.create({
      ...createJobApplicationDto,
      job,
      jobSeeker: user,
    });

    await this.jobApplicationsRepository.persistAndFlush(jobApplication);
    return jobApplication;
  }

  async findAll(): Promise<JobApplication[]> {
    return this.jobApplicationsRepository.findAll();
  }

  async findOne(id: string): Promise<JobApplication> {
    return this.jobApplicationsRepository.findOneOrFail({ id });
  }

  async update(
    id: string,
    jobApplication: JobApplication
  ): Promise<JobApplication> {
    await this.jobApplicationsRepository.nativeUpdate({ id }, jobApplication);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.jobApplicationsRepository.nativeDelete({ id });
  }
}
