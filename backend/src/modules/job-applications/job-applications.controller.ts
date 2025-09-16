import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@modules/auth/roles.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { JobApplication } from '../../entities/job-application.entity';

@ApiTags('job-applications')
@Controller('job-applications')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles('JobSeeker')
  async create(
    @Body(ValidationPipe) createJobApplicationDto: CreateJobApplicationDto,
    @Req() req
  ): Promise<ApiResponse<JobApplication>> {
    const application = await this.jobApplicationsService.create(
      createJobApplicationDto,
      req.user
    );
    return {
      status: 'success',
      message: 'Application created successfully',
      data: application,
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  async findAll(): Promise<ApiResponse<JobApplication[]>> {
    const items = await this.jobApplicationsService.findAll();
    return {
      status: 'success',
      message: 'Successfully retrieved applications',
      data: items,
      meta: { count: items.length },
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<JobApplication>> {
    const item = await this.jobApplicationsService.findOne(id);
    return {
      status: 'success',
      message: 'Successfully retrieved application',
      data: item,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) jobApplication: JobApplication
  ): Promise<ApiResponse<JobApplication>> {
    const updated = await this.jobApplicationsService.update(
      id,
      jobApplication
    );
    return {
      status: 'success',
      message: 'Application updated successfully',
      data: updated,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin', 'JobSeeker')
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.jobApplicationsService.remove(id);
    return {
      status: 'success',
      message: 'Application removed successfully',
      data: null,
    };
  }
}
