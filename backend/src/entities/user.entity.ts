import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Roles } from './role.entity';

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

  @ManyToMany(() => Roles, roles => roles.users, {
    owner: true,
    pivotTable: 'user_roles',
  })
  roles = new Collection<Roles>(this);
}
