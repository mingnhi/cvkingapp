import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'Roles' })
export class Roles extends AuditableEntity {
  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'string' })
  description: string;
}
