import { Collection, Entity, ManyToMany, Property, Unique } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Job } from './job.entity';

@Entity({ tableName: 'job_tags' })
export class JobTag extends AuditableEntity {
  @Property()
  @Unique()
  name!: string;

  @ManyToMany(() => Job, (job) => job.tags)
  jobs = new Collection<Job>(this);
}
