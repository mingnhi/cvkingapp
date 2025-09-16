import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  Property,
  PrimaryKey,
} from '@mikro-orm/core';
import { Company } from './company.entity';
import { Users } from './user.entity';
import { JobCategory } from './job-category.entity';
import { Skill } from './skill.entity';
import { JobTag } from './job-tag.entity';

export enum JobStatus {
  ACTIVE = 'Active',
  DRAFT = 'Draft',
  EXPIRED = 'Expired',
  CLOSED = 'Closed',
}

@Entity({ tableName: 'Jobs' })
export class Job {
  @PrimaryKey({ columnType: 'int', autoincrement: true })
  JobId: number;

  @Property({ columnType: 'int' })
  CompanyId: number;

  @Property({ columnType: 'int', nullable: true })
  PostedByUserId?: number;

  @Property({ type: 'nvarchar', length: 300, nullable: false })
  Title: string;

  @Property({ type: 'nvarchar', length: 300, nullable: false, unique: true })
  Slug: string;

  @Property({ type: 'nvarchar', length: 1000, nullable: true })
  ShortDescription?: string;

  @Property({ type: 'nvarchar', length: -1, nullable: true })
  Description?: string;

  @Property({ type: 'nvarchar', length: -1, nullable: true })
  Requirements?: string;

  @Property({ type: 'nvarchar', length: -1, nullable: true })
  Benefits?: string;

  @Property({ columnType: 'int', nullable: true })
  SalaryMin?: number;

  @Property({ columnType: 'int', nullable: true })
  SalaryMax?: number;

  @Property({ type: 'nvarchar', length: 10, nullable: true })
  Currency?: string;

  @Property({ type: 'nvarchar', length: 50, nullable: true })
  JobType?: string;

  @Property({ type: 'nvarchar', length: 300, nullable: true })
  Location?: string;

  @Property({ columnType: 'int', nullable: true })
  CategoryId?: number;

  @Property({
    type: 'nvarchar',
    length: 50,
    nullable: false,
    default: 'Active',
  })
  Status: string = JobStatus.ACTIVE;

  @Property({ columnType: 'int', nullable: false, default: 0 })
  ViewsCount: number = 0;

  @Property({
    type: 'datetime2',
    nullable: false,
    defaultRaw: 'SYSUTCDATETIME()',
  })
  PostedAt: Date = new Date();

  @Property({ type: 'datetime2', nullable: true })
  ExpiresAt?: Date;

  @Property({
    type: 'datetime2',
    nullable: false,
    defaultRaw: 'SYSUTCDATETIME()',
  })
  CreatedAt: Date = new Date();

  @Property({ type: 'datetime2', nullable: true })
  UpdatedAt?: Date;

  @ManyToOne(() => Company, { fieldName: 'CompanyId', deleteRule: 'cascade' })
  company: Company;

  @ManyToOne(() => Users, {
    fieldName: 'PostedByUserId',
    deleteRule: 'set null',
    nullable: true,
  })
  postedBy?: Users;

  @ManyToOne(() => JobCategory, {
    fieldName: 'CategoryId',
    deleteRule: 'set null',
    nullable: true,
  })
  category?: JobCategory;

  @ManyToMany(() => Skill, 'jobs', {
    owner: true,
    pivotTable: 'JobSkills',
    cascade: [Cascade.ALL],
  })
  skills = new Collection<Skill>(this);

  @ManyToMany(() => JobTag, 'jobs', {
    owner: true,
    pivotTable: 'JobJobTags',
    cascade: [Cascade.ALL],
  })
  tags = new Collection<JobTag>(this);
}
