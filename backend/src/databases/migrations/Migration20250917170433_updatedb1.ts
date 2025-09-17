import { Migration } from '@mikro-orm/migrations';

export class Migration20250917170433_updatedb1 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table [job_applications] alter column [updated_at] nvarchar(max);`);

    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'BlogComments' and all_columns.name = 'created_at') if @constraint0 is not null exec('alter table BlogComments drop constraint ' + @constraint0);`);
    this.addSql(`alter table [BlogComments] alter column [created_at] date not null;`);
    this.addSql(`ALTER TABLE [BlogComments] ADD CONSTRAINT [blogcomments_created_at_default] DEFAULT 'SYSDATETIME' FOR [created_at];`);

    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'BlogTags' and all_columns.name = 'created_at') if @constraint0 is not null exec('alter table BlogTags drop constraint ' + @constraint0);`);
    this.addSql(`alter table [BlogTags] alter column [created_at] date not null;`);
    this.addSql(`ALTER TABLE [BlogTags] ADD CONSTRAINT [blogtags_created_at_default] DEFAULT 'SYSDATETIME' FOR [created_at];`);

    this.addSql(`alter table [job_applications] alter column [updated_at] date;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table [job_applications] alter column [updated_at] nvarchar(max);`);

    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'BlogComments' and all_columns.name = 'created_at') if @constraint0 is not null exec('alter table BlogComments drop constraint ' + @constraint0);`);
    this.addSql(`alter table [BlogComments] alter column [created_at] date not null;`);
    this.addSql(`ALTER TABLE [BlogComments] ADD CONSTRAINT [blogcomments_created_at_default] DEFAULT SYSDATETIME FOR [created_at];`);

    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'BlogTags' and all_columns.name = 'created_at') if @constraint0 is not null exec('alter table BlogTags drop constraint ' + @constraint0);`);
    this.addSql(`alter table [BlogTags] alter column [created_at] date not null;`);
    this.addSql(`ALTER TABLE [BlogTags] ADD CONSTRAINT [blogtags_created_at_default] DEFAULT SYSDATETIME FOR [created_at];`);

    this.addSql(`alter table [job_applications] alter column [updated_at] datetime2(7);`);
  }

}
