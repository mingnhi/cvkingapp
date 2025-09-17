import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { JobApplication } from '../../entities/job-application.entity';

@Injectable()
export class JobApplicationsRepository {
  constructor(
    @InjectRepository(JobApplication)
    private readonly jobApplicationRepository: EntityRepository<JobApplication>,
    private readonly em: EntityManager
  ) {}

  create(data: Partial<JobApplication>): JobApplication {
    return this.jobApplicationRepository.create({ ...data, id: undefined });
  }

  async persistAndFlush(entity: JobApplication): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

  async findAll(): Promise<JobApplication[]> {
    return this.jobApplicationRepository.findAll();
  }

  async findOneOrFail(where: any, options?: any): Promise<JobApplication> {
    return this.jobApplicationRepository.findOneOrFail(where, options);
  }

  async findOne(id: string, options?: any): Promise<JobApplication | null> {
    return this.jobApplicationRepository.findOne(id, options);
  }

  async nativeUpdate(where: any, data: any): Promise<void> {
    await this.jobApplicationRepository.nativeUpdate(where, data);
  }

  async nativeDelete(where: any): Promise<void> {
    await this.jobApplicationRepository.nativeDelete(where);
  }
}
