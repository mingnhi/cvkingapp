import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import extractJson, { extractJsonArray } from 'src/utils/extractJson';

@Injectable()
export class JobsRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<any[]> {
    const raw = await this.em.getConnection().execute('EXEC SP_GetAllJobs');
    return extractJsonArray(raw);
  }

  async findOne(id: string): Promise<any | null> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_GetJobById ?', [id]);
    if (!raw?.[0]) return null;
    return extractJson(raw);
  }

  async create(dto: CreateJobDto): Promise<any> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_InsertJobFull ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?', [
        dto.CompanyId,
        dto.PostedByUserId,
        dto.Title,
        dto.Slug,
        dto.ShortDescription,
        dto.Description,
        dto.Requirements,
        dto.Benefits,
        dto.SalaryMin,
        dto.SalaryMax,
        dto.Currency,
        dto.JobType,
        dto.Location,
        dto.CategoryId,
        dto.ExpiresAt,
        JSON.stringify(dto.skillIds ?? []),
        JSON.stringify(dto.tagIds ?? []),
      ]);
    return extractJson(raw);
  }

  async update(dto: UpdateJobDto): Promise<any> {
    const raw = await this.em
      .getConnection()
      .execute('EXEC SP_UpdateJobFull ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?', [
        dto.id,
        dto.Title,
        dto.Slug,
        dto.ShortDescription,
        dto.Description,
        dto.Requirements,
        dto.Benefits,
        dto.SalaryMin,
        dto.SalaryMax,
        dto.Currency,
        dto.JobType,
        dto.Location,
        dto.CategoryId,
        dto.Status,
        dto.ExpiresAt,
        JSON.stringify(dto.skillIds ?? []),
        JSON.stringify(dto.tagIds ?? []),
      ]);
    return extractJson(raw);
  }

  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteJob ?', [id]);
    return true;
  }
}
