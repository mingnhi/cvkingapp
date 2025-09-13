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
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dtos/create-job.dto';
import { JobQueryDto } from './dtos/job-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@modules/auth/roles.decorator';
// import { Role } from '../../enums/role.enum';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  create(@Body() createJobDto: CreateJobDto, @Req() req) {
    return this.jobsService.create(createJobDto, req.user);
  }

  @Get()
  async findAll(@Query() query: JobQueryDto) {
    return this.jobsService.findAll(query);
  }

  @Get('popular')
  async findPopular(@Query('limit') limit?: number) {
    return this.jobsService.findPopular(limit);
  }

  @Get('recent')
  async findRecent(@Query('limit') limit?: number) {
    return this.jobsService.findRecent(limit);
  }

  @Get('company/:companyId')
  async findByCompany(
    @Param('companyId') companyId: string,
    @Query() query: JobQueryDto
  ) {
    return this.jobsService.findByCompany(companyId, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    const job = await this.jobsService.findOne(id, req.user, req.sessionId);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: Partial<CreateJobDto>,
    @Req() req
  ) {
    return this.jobsService.update(id, updateJobDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  async remove(@Param('id') id: string, @Req() req) {
    await this.jobsService.remove(id, req.user);
    return { message: 'Job deleted successfully' };
  }

  @Get(':id/stats')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Employer', 'Admin')
  async getStats(@Param('id') id: string, @Req() req) {
    return this.jobsService.getJobStats(id, req.user);
  }
}
