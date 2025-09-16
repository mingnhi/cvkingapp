import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SavedJobsService } from './saved-jobs.service';
import { SavedJobQueryDto } from './dtos/saved-job-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
// import { Role } from '../../enums/role.enum';

@Controller('saved-jobs')
@UseGuards(AuthGuard('jwt'))
@Roles('JobSeeker')
// @Roles('Employer', 'Admin')
export class SavedJobsController {
  constructor(private readonly savedJobsService: SavedJobsService) {}

  @Post(':jobId')
  async saveJob(@Param('jobId') jobId: string, @Req() req) {
    return this.savedJobsService.saveJob(jobId, req.user);
  }

  @Get()
  async findAll(@Query() query: SavedJobQueryDto, @Req() req) {
    return this.savedJobsService.findAll(query, req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    return this.savedJobsService.findOne(id, req.user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    await this.savedJobsService.remove(id, req.user);
    return { message: 'Saved job removed successfully' };
  }

  @Delete('job/:jobId')
  async removeByJobId(@Param('jobId') jobId: string, @Req() req) {
    await this.savedJobsService.removeByJobId(jobId, req.user);
    return { message: 'Saved job removed successfully' };
  }

  @Get('job/:jobId/check')
  async isJobSaved(@Param('jobId') jobId: string, @Req() req) {
    const isSaved = await this.savedJobsService.isJobSaved(jobId, req.user);
    return { isSaved };
  }
}
