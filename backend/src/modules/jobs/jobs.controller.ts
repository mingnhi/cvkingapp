import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JobsRepository } from './jobs.repository';
import { CreateJobDto } from './dtos/create-job.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { Job } from '../../entities/job.entity';


@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(
    // private readonly jobsService: JobsService
    private readonly jobsRepository: JobsRepository
  ) {}

  @Post()
  async create(
    @Body(ValidationPipe) createJobDto: CreateJobDto
  ): Promise<ApiResponse<Job>> {
    const job = await this.jobsRepository.create(createJobDto);
    return {
      status: 'success',
      message: 'Job created successfully',
      data: job,
    };
  }

  @Get()
  async findAll(): Promise<ApiResponse<Job[]>> {
    const jobs = await this.jobsRepository.findAll();
    return {
      status: 'success',
      message: 'Successfully retrieved jobs',
      data: jobs,
      meta: { count: jobs.length },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<Job>> {
    const job = await this.jobsRepository.findOne(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return {
      status: 'success',
      message: 'Successfully retrieved job',
      data: job,
    };
  }

  @Put()
  async update(
    @Body(ValidationPipe) updateJobDto: any
  ): Promise<ApiResponse<Job>> {
    const job = await this.jobsRepository.update(updateJobDto);
    return {
      status: 'success',
      message: 'Job updated successfully',
      data: job,
    };
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.jobsRepository.delete(id);
    return {
      status: 'success',
      message: 'Job deleted successfully',
      data: null,
    };
  }
}
