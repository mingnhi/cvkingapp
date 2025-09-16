import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { JobQueryDto } from './dtos/job-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
// import { Role } from '../../enums/role.enum';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { Job } from '../../entities/job.entity';


@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  async create(
    @Body(ValidationPipe) createJobDto: CreateJobDto,
    @Req() req
  ): Promise<ApiResponse<Job>> {
    const job = await this.jobsService.create(createJobDto, req.user);
    return {
      status: 'success',
      message: 'Job created successfully',
      data: job,
    };
  }

  @Get()
  async findAll(
    @Query(ValidationPipe) query: JobQueryDto
  ): Promise<ApiResponse<{ jobs: Job[]; total: number }>> {
    const result = await this.jobsService.findAll(query);
    return {
      status: 'success',
      message: 'Successfully retrieved jobs',
      data: result,
      meta: {
        count: result.total,
        page: query.page ?? 1,
        limit: query.limit ?? 10,
      },
    };
  }

  @Get('popular')
  async findPopular(
    @Query('limit') limit?: number
  ): Promise<ApiResponse<Job[]>> {
    const jobs = await this.jobsService.findPopular(limit);
    return {
      status: 'success',
      message: 'Successfully retrieved popular jobs',
      data: jobs,
      meta: { count: jobs.length },
    };
  }

  @Get('recent')
  async findRecent(
    @Query('limit') limit?: number
  ): Promise<ApiResponse<Job[]>> {
    const jobs = await this.jobsService.findRecent(limit);
    return {
      status: 'success',
      message: 'Successfully retrieved recent jobs',
      data: jobs,
      meta: { count: jobs.length },
    };
  }

  @Get('company/:companyId')
  async findByCompany(
    @Param('companyId') companyId: string,
    @Query(ValidationPipe) query: JobQueryDto
  ): Promise<ApiResponse<{ jobs: Job[]; total: number }>> {
    const result = await this.jobsService.findByCompany(companyId, query);
    return {
      status: 'success',
      message: 'Successfully retrieved company jobs',
      data: result,
      meta: {
        count: result.total,
        page: query.page ?? 1,
        limit: query.limit ?? 10,
      },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req
  ): Promise<ApiResponse<Job>> {
    const job = await this.jobsService.findOne(id, req.user, req.sessionId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return {
      status: 'success',
      message: 'Successfully retrieved job',
      data: job,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateJobDto: Partial<CreateJobDto>,
    @Req() req
  ): Promise<ApiResponse<Job>> {
    const job = await this.jobsService.update(id, updateJobDto, req.user);
    return {
      status: 'success',
      message: 'Job updated successfully',
      data: job,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req
  ): Promise<ApiResponse<null>> {
    await this.jobsService.remove(id, req.user);
    return {
      status: 'success',
      message: 'Job deleted successfully',
      data: null,
    };
  }

  @Get(':id/stats')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  async getStats(
    @Param('id', ParseIntPipe) id: number,
    @Req() req
  ): Promise<ApiResponse<any>> {
    const stats = await this.jobsService.getJobStats(id, req.user);
    return {
      status: 'success',
      message: 'Successfully retrieved job stats',
      data: stats,
    };
  }
}
