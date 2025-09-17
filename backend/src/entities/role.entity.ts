import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';
import { Users } from './user.entity';

@Entity({ tableName: 'Roles' })
export class Roles extends AuditableEntity {
  [x: string]: any;
  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'string' })
  description: string;

  @ManyToMany(() => Users, users => users.roles, {
    owner: true,
    pivotTable: 'user_roles',
  })
  users = new Collection<Users>(this);
}
