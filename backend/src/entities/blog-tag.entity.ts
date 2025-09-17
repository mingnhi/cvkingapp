import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogTags' })
export class BlogTags extends AuditableEntity {
  @Property({ type: 'string', length: 200, unique: true })
  name: string;

  @Property({ type: 'date', default: 'SYSDATETIME' })
  createdAt: Date;
}
