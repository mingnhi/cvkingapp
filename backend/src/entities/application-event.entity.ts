import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { JobApplication } from './job-application.entity';

export enum ApplicationEventType {
  APPLIED = 'Applied',
  STATUS_CHANGED = 'StatusChanged',
  VIEWED_BY_EMPLOYER = 'ViewedByEmployer',
  INTERVIEW_SCHEDULED = 'InterviewScheduled',
  REJECTED = 'Rejected',
  HIRED = 'Hired',
}

@Entity({ tableName: 'application_events' })
export class ApplicationEvent extends AuditableEntity {
  @ManyToOne(() => JobApplication)
  application!: JobApplication;

  @Property()
  eventType!: string;

  @Property({ type: 'text', nullable: true })
  eventData?: string; // JSON details

  @Property()
  createdAt: Date = new Date();
}


