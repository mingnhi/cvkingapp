import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'BlogViews' })
export class BlogViews extends AuditableEntity {
  @Property({ type: 'int', fieldName: 'BlogPostId' })
  blogPostId: number;

  @Property({ type: 'int', nullable: true, fieldName: 'ViewerUserId' })
  viewerUserId?: number;

  @Property({ type: 'string', nullable: true, fieldName: 'SessionId' })
  sessionId?: string;

  @Property({ type: 'datetime2', nullable: false, defaultRaw: 'SYSUTCDATETIME()', fieldName: 'ViewedAt' })
  viewedAt: Date = new Date();
}
