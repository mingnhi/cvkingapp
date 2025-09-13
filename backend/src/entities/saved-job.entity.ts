import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Job } from './job.entity';
import { Users } from './user.entity';

@Entity({ tableName: 'saved_jobs' })
@Unique({ properties: ['jobSeeker', 'job'] })
export class SavedJob extends AuditableEntity {
  @ManyToOne(() => Users)
  jobSeeker!: Users;

  @ManyToOne(() => Job)
  job!: Job;

  @Property()
  savedAt: Date = new Date();
}


