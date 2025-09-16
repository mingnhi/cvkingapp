import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Job } from './job.entity';
import { Users } from './user.entity';

export enum ApplicationStatus {
  PENDING = 'Pending',
  REVIEWED = 'Reviewed',
  INTERVIEW = 'Interview',
  REJECTED = 'Rejected',
  HIRED = 'Hired',
}

@Entity({ tableName: 'job_applications' })
export class JobApplication extends AuditableEntity {
  @ManyToOne(() => Job)
  job!: Job;

  @ManyToOne(() => Users)
  jobSeeker!: Users;

  @Property({ type: 'text', nullable: true })
  coverLetter?: string;

  @Enum(() => ApplicationStatus)
  status: ApplicationStatus = ApplicationStatus.PENDING;

  @Property()
  appliedAt: Date = new Date();

  @Property({ nullable: true })
  updatedAt?: Date;

  @Property()
  isDeleted: boolean = false;
}


