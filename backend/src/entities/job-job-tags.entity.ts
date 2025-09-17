import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
@Entity({ tableName: 'JobJobTags' })
export class JobJobTags extends AuditableEntity{
  @PrimaryKey()
  jobId: string;

  @PrimaryKey()
  jobTagId: string;
}
