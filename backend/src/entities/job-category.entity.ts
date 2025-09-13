import { Entity, Property, Unique } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'job_categories' })
export class JobCategory extends AuditableEntity {
  @Property()
  @Unique()
  name!: string;
}
