import { Entity, Property } from '@mikro-orm/core';
import { AuditableEntity } from './base/auditable_entity';

@Entity({ tableName: 'Industry' })
export class Industry extends AuditableEntity {
  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'string' })
  slug: string;

  @Property({ type: 'string' })
  description: string;

  @Property({ type: 'string' })
  parantId: string;
}
