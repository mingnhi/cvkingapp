import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogComments' })
export class BlogComments extends AuditableEntity {
  @Property({ type: 'string' })
  blogPostId: string;

  @Property({ type: 'string', nullable: true })
  userId?: string;

  @Property({ type: 'string', length: 200, nullable: true })
  guestName?: string;

  @Property({ type: 'text' })
  content: string;

  @Property({ type: 'boolean', default: false })
  isApproved: boolean = false;
}
