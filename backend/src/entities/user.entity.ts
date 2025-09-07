import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'Users' })
export class Users extends AuditableEntity {
  @Property({ type: 'string' })
  email: string;

  @Property({ type: 'string' })
  password: string;

  @Property({ type: 'bit', default: 1 })
  isActive: boolean;

  @Property({ type: 'bit', default: 0 })
  isVerify: boolean;

  @Property({ type: 'string', nullable: true })
  otpCode: string;
}
