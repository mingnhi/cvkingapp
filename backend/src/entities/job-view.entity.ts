import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'job_views' })
export class JobView extends AuditableEntity {
  @Property({ type: 'string' })
  jobId: string;

  @Property({ type: 'string', nullable: true })
  viewerId?: string;

  @Property({ nullable: true })
  sessionId?: string;

  @Property()
  viewedAt: Date = new Date();
}
