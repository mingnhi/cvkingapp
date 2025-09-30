import { Migration } from '@mikro-orm/migrations';

export class Migration20250930220449 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table [Companies] add [benefits] text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'Companies' and all_columns.name = 'benefits') if @constraint0 is not null exec('alter table [Companies] drop constraint ' + @constraint0);`);
    this.addSql(`alter table [Companies] drop column [benefits];`);
  }

}
