import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogTags' })
export class BlogTags extends AuditableEntity {
  @Property({ type: 'nvarchar', length: 200, nullable: false, unique: true })
  Name: string;
}
