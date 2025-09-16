import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Job } from './job.entity';
import { Users } from './user.entity';

@Entity({ tableName: 'job_views' })
export class JobView extends AuditableEntity {
  @ManyToOne(() => Job)
  job!: Job;

  @ManyToOne(() => Users, { nullable: true })
  viewer?: Users;

  @Property({ nullable: true })
  sessionId?: string;

  @Property()
  viewedAt: Date = new Date();
}


