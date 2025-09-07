import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'Candidates' })
export class Cadidates extends AuditableEntity {
  @Property({ type: 'string' })
  userId: string;

  @Property({ type: 'string' })
  fullName: string;

  @Property({ type: 'string' })
  dateOfBrith: string;

  @Property({ type: 'string' })
  gender: string;

  @Property({ type: 'string' })
  phone: string;

  @Property({ type: 'string' })
  address: string;

  @Property({ type: 'string' })
  avatar: string;

  @Property({ type: 'string' })
  aboutMe: string;
}
