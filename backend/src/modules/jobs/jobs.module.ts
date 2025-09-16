import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Job } from '../../entities/job.entity';
import { JobCategory } from '../../entities/job-category.entity';
import { Skill } from '../../entities/skill.entity';
import { JobTag } from '../../entities/job-tag.entity';
import { Company } from '../../entities/company.entity';
import { Users } from '../../entities/user.entity';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { JobViewsModule } from '../job-views/job-views.module';
import { JobsRepository } from './jobs.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Job,
      JobCategory,
      Skill,
      JobTag,
      Company,
      Users,
    ]),
    JobViewsModule,
  ],
  controllers: [JobsController],
  providers: [JobsRepository, JobsService],
  exports: [JobsService],
})
export class JobsModule {}
