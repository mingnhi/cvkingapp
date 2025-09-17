import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JobsRepository } from './jobs.repository';

import { ApiResponse } from '@common/interfaces/api-response.interface';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly repo: JobsRepository) {}

  @Get()
  async findAll(): Promise<ApiResponse<any>> {
    const data = await this.repo.findAll();
    return {
      status: 'success',
      message: 'All jobs',
      data,
      meta: { count: data.length },
    };
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
