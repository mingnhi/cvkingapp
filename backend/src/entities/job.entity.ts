import {
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  Property,
  Unique,
} from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
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

@Entity({ tableName: 'jobs' })
export class Job extends AuditableEntity {
  @ManyToOne(() => Company)
  company!: Company;

  @ManyToOne(() => Users, { nullable: true })
  postedBy?: Users;

  @Property()
  title!: string;

  @Property()
  @Unique()
  slug!: string;

  @Property({ type: 'text', nullable: true })
  shortDescription?: string;

  @Property({ type: 'text', nullable: true })
  description?: string;

  @Property({ type: 'text', nullable: true })
  requirements?: string;

  @Property({ type: 'text', nullable: true })
  benefits?: string;

  @Property({ nullable: true })
  salaryMin?: number;

  @Property({ nullable: true })
  salaryMax?: number;

  @Property({ nullable: true })
  currency?: string;

  @Property({ nullable: true })
  jobType?: string; // Full-time, Part-time, Internship...

  @Property({ nullable: true })
  location?: string;

  @ManyToOne(() => JobCategory, { nullable: true })
  category?: JobCategory;

  @Enum(() => JobStatus)
  status: JobStatus = JobStatus.ACTIVE;

  @Property()
  viewsCount: number = 0;

  @Property()
  postedAt: Date = new Date();

  @Property({ nullable: true })
  expiresAt?: Date;

  @ManyToMany(() => Skill, 'jobs', {
    owner: true,
    pivotTable: 'job_skills',
    cascade: [Cascade.ALL],
  })
  skills = new Collection<Skill>(this);

  @ManyToMany(() => JobTag, 'jobs', {
    owner: true,
    pivotTable: 'job_job_tags',
    cascade: [Cascade.ALL],
  })
  tags = new Collection<JobTag>(this);
}
