import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Job } from '../../entities/job.entity';

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: EntityRepository<Job>,
    private readonly em: EntityManager
  ) {}

  async findAll(where: any, options: any): Promise<[Job[], number]> {
    return this.jobRepository.findAndCount(where, options);
  }

  async findOne(id: number, options?: any): Promise<Job | null> {
    return this.jobRepository.findOne({ JobId: id }, options);
  }

  async findOneOrFail(id: number, populate?: { populate: string[] }): Promise<Job> {
    const job = await this.findOne(id, populate);
    if (!job) {
      throw new Error(`Job with id ${id} not found`);
    }
    return job;
  }

  async find(where: any, options: any): Promise<Job[]> {
    return this.jobRepository.find(where, options);
  }

  create(data: Partial<Job>): Job {
    return this.jobRepository.create(data);
  }

  async persistAndFlush(entity: Job): Promise<void> {
    await this.em.persistAndFlush(entity);
  }

  async removeAndFlush(entity: Job): Promise<void> {
    await this.em.removeAndFlush(entity);
  }
}
