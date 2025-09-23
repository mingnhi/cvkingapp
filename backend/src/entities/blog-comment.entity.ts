import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogComments' })
export class BlogComments extends AuditableEntity {
  @Property({ type: 'string', length: 500, nullable: true })
  blogPostId?: string;

  @Property({ type: 'string', length: 500, nullable: true })
  userId?: string;

  @Property({ type: 'text' })
  content: string;

  @Property({ type: 'boolean', default: false })
  isApproved: boolean = false;

  @Property({ type: 'date', default: 'SYSDATETIME' })
  createdAt: Date;
}
