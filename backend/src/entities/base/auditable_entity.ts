import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';

@Entity({ abstract: true })
export abstract class AuditableEntity {
  @PrimaryKey({ type: 'string' })
  id: string = uuidv4();

  @Property({ type: 'date', nullable: false })
  createdAt: Date = new Date();

  @Property({ type: 'date', nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;
}
