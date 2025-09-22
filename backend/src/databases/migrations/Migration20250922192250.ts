import { Migration } from '@mikro-orm/migrations';

export class Migration20250922192250 extends Migration {

  override async up(): Promise<void> {

    this.addSql("alter table [Users] add [username] nvarchar(255) not null default '';");
  }

  override async down(): Promise<void> {
    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'Users' and all_columns.name = 'username') if @constraint0 is not null exec('alter table [Users] drop constraint ' + @constraint0);`);
    this.addSql(`alter table [Users] drop column [username];`);

    this.addSql("alter table [Users] add [username] nvarchar(255) not null default '';");

  }

}
