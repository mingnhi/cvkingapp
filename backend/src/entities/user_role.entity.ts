import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'UserRoles' })
export class UserRole extends AuditableEntity {
  @Property({ type: 'string' })
  userId: string;

  @Property({ type: 'string' })
  roleId: string;

  @Property({ type: 'bit' })
  isActive: boolean;
}
