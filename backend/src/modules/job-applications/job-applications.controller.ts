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
import { JobApplicationsRepository } from './job-applications.repository';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { UpdateJobApplicationDto } from './dtos/update-job-application.dto';

@ApiTags('job-applications')
@Controller('job-applications')
export class JobApplicationsController {
  constructor(private readonly repo: JobApplicationsRepository) {}

  @Get()
  async findAll(): Promise<ApiResponse<any>> {
    const data = await this.repo.findAll();
    return {
      status: 'success',
      message: 'All job applications',
      data,
      meta: { count: data.length },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Found job application', data };
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateJobApplicationDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Created job application', data };
  }

  @Put()
  async update(
    @Body(ValidationPipe) dto: UpdateJobApplicationDto
  ): Promise<ApiResponse<any>> {
    const data = await this.repo.update(dto);
    return { status: 'success', message: 'Updated job application', data };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return {
      status: 'success',
      message: 'Deleted job application',
      data: null,
    };
  }
}
