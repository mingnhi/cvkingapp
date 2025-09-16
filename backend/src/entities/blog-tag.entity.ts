import { Entity, Property, Unique } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogTags' })
export class BlogTags extends AuditableEntity {
  @Property({ type: 'string', length: 200 })
  @Unique()
  name: string;
}
