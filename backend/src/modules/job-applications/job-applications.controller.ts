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
} from '@nestjs/common';
import { JobApplicationsService } from './job-applications.service';
import { CreateJobApplicationDto } from './dtos/create-job-application.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@modules/auth/roles.decorator';

@Controller('job-applications')
export class JobApplicationsController {
  constructor(
    private readonly jobApplicationsService: JobApplicationsService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles('JobSeeker')
  create(@Body() createJobApplicationDto: CreateJobApplicationDto, @Req() req) {
    return this.jobApplicationsService.create(
      createJobApplicationDto,
      req.user
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  findAll() {
    return this.jobApplicationsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.jobApplicationsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  update(@Param('id') id: string, @Body() jobApplication) {
    return this.jobApplicationsService.update(id, jobApplication);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin', 'JobSeeker')
  remove(@Param('id') id: string) {
    return this.jobApplicationsService.remove(id);
  }
}
