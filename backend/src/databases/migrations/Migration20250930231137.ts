import { Migration } from '@mikro-orm/migrations';

export class Migration20250930231137 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table [Companies] alter column [benefits] nvarchar(max);`);

    this.addSql(`alter table [Companies] alter column [benefits] nvarchar(max);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table [Companies] alter column [benefits] text;`);
  }

}
