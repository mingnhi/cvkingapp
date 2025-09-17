import { Company } from '@entities/compoany.entity';
import { Module } from '@nestjs/common';
import { CompaniesRepository } from './companies.repository';
import { CompaniesController } from './company.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Company])],
  providers: [CompaniesRepository],
  controllers: [CompaniesController],
})
export class CompanyModule {}
