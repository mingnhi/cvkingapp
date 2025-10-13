import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogComments' })
export class BlogComments extends AuditableEntity {
  @Property({ type: 'int', fieldName: 'BlogPostId' })
  blogPostId: number;

  @Property({ type: 'int', nullable: true, fieldName: 'UserId' })
  userId?: number;

  @Property({ type: 'string', length: 200, nullable: true, fieldName: 'GuestName' })
  guestName?: string;

  @Property({ type: 'text', fieldName: 'Content' })
  content: string;

  @Property({ type: 'boolean', default: false, fieldName: 'IsApproved' })
  isApproved: boolean = false;
}
