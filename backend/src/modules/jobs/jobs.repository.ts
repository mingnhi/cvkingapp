import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';
import extractJson, { extractJsonArray } from 'src/utils/extractJson';

@Injectable()
export class JobsRepository {
  constructor(private readonly em: EntityManager) {}

  async findAll(): Promise<any[]> {
    const raw = await this.em.getConnection().execute('EXEC SP_GetAllJobs');
    return extractJsonArray(raw);
  }

  async findFiltered(filter: FilterJobsDto): Promise<{ data: any[]; total: number }> {
    const {
      keyword,
      location,
      categoryId,
      salaryMin,
      salaryMax,
      jobType,
      companyId,
      skillIds,
      tagIds,
      sortBy = 'posted_at',
      sortOrder = 'DESC',
      page = 1,
      limit = 10,
    } = filter;

    const offset = (page - 1) * limit;
    const params = [
      keyword || null,
      location || null,
      categoryId || null,
      salaryMin || null,
      salaryMax || null,
      jobType || null,
      companyId || null,
      skillIds || null,
      tagIds || null,
      sortBy,
      sortOrder,
      offset,
      limit,
    ];

    const raw = await this.em.getConnection().execute('EXEC SP_GetFilteredJobs ?,?,?,?,?,?,?,?,?,?,?,?,?,?', params);

    if (!raw?.[0]) return { data: [], total: 0 };

    const result = extractJson(raw);
    return {
      data: result.data || [],
      total: result.total || 0,
    };
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
