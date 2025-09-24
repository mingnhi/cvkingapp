import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { JobsRepository } from './jobs.repository';

import { ApiResponse } from '@common/interfaces/api-response.interface';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { FilterJobsDto } from './dtos/filter-jobs.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly repo: JobsRepository) {}

  @Get()
  async findAll(
    @Query(ValidationPipe) query: FilterJobsDto
  ): Promise<ApiResponse<any>> {
    // Check if any filter parameters are provided
    const hasFilters =
      query.keyword ||
      query.location ||
      query.categoryId ||
      query.salaryMin !== undefined ||
      query.salaryMax !== undefined ||
      query.jobType ||
      query.companyId ||
      query.skillIds ||
      query.tagIds;

    if (hasFilters) {
      const result = await this.repo.findFiltered(query);
      return {
        status: 'success',
        message: 'Filtered jobs',
        data: result.data,
        meta: {
          count: result.total,
          page: query.page || 1,
          limit: query.limit || 10,
          totalPages: Math.ceil(result.total / (query.limit || 10)),
        },
      };
    } else {
      const data = await this.repo.findAll();
      return {
        status: 'success',
        message: 'All jobs',
        data,
        meta: { count: data.length },
      };
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Found job', data };
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateJobDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Created job', data };
  }

  @Put()
  async update(
    @Body(ValidationPipe) dto: UpdateJobDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.update(dto);
    return { status: 'success', message: 'Updated job', data };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return { status: 'success', message: 'Deleted job', data: null };
  }
}
