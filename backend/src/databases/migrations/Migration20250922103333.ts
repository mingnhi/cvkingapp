import { Migration } from '@mikro-orm/migrations';

export class Migration20250922103333 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`CREATE TABLE [BlogComments] ([id] nvarchar(255) not null, [updated_at] date null, [blog_post_id] nvarchar(500) null, [user_id] nvarchar(500) null, [content] text not null, [is_approved] bit not null CONSTRAINT [blogcomments_is_approved_default] DEFAULT 0, [created_at] date not null CONSTRAINT [blogcomments_created_at_default] DEFAULT 'SYSDATETIME', CONSTRAINT [BlogComments_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [Companies] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [name] nvarchar(300) not null, [slug] nvarchar(300) null, [logo_url] nvarchar(1000) null, [banner_url] nvarchar(1000) null, [industry] nvarchar(200) null, [company_size] nvarchar(50) null, [website] nvarchar(500) null, [location] nvarchar(300) null, [description] text null, [is_verified] bit not null CONSTRAINT [companies_is_verified_default] DEFAULT 0, CONSTRAINT [Companies_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [EmployerProfiles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(200) null, [company] nvarchar(200) null, [title] nvarchar(200) null, [phone] nvarchar(50) null, CONSTRAINT [EmployerProfiles_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [JobSeekerProfiles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(200) null, [full_name] nvarchar(300) null, [phone] nvarchar(50) null, [dob] date null, [location] nvarchar(300) null, [summary] text null, [current_title] nvarchar(200) null, [years_experience] int null, CONSTRAINT [JobSeekerProfiles_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [JobSeekerProfiles_user_id_unique] ON [JobSeekerProfiles] ([user_id]) WHERE [user_id] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [Roles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [role_name] nvarchar(255) not null, [description] nvarchar(255) null, CONSTRAINT [Roles_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Roles_role_name_unique] ON [Roles] ([role_name]) WHERE [role_name] IS NOT NULL;`);

    this.addSql(`CREATE TABLE [UserRoles] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [user_id] nvarchar(255) not null, [role_id] nvarchar(255) not null, CONSTRAINT [UserRoles_pkey] PRIMARY KEY ([id]));`);

    this.addSql(`CREATE TABLE [Users] ([id] nvarchar(255) not null, [created_at] date not null, [updated_at] date null, [email] nvarchar(255) not null, [password] nvarchar(255) not null, [is_email_confirmed] bit not null CONSTRAINT [users_is_email_confirmed_default] DEFAULT 0, [last_login_at] date null, [is_active] bit not null CONSTRAINT [users_is_active_default] DEFAULT 1, [is_deleted] bit not null CONSTRAINT [users_is_deleted_default] DEFAULT 0, [display_name] nvarchar(255) null, [avatar_url] nvarchar(255) null, [preferred_locale] nvarchar(255) null, [google_id] nvarchar(255) null, [linked_in_id] nvarchar(255) null, [refresh_token] nvarchar(1000) null, CONSTRAINT [Users_pkey] PRIMARY KEY ([id]));`);
    this.addSql(`CREATE UNIQUE INDEX [Users_email_unique] ON [Users] ([email]) WHERE [email] IS NOT NULL;`);

    this.addSql(`alter table [job_applications] alter column [updated_at] nvarchar(max);`);

    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'BlogTags' and all_columns.name = 'created_at') if @constraint0 is not null exec('alter table BlogTags drop constraint ' + @constraint0);`);
    this.addSql(`alter table [BlogTags] alter column [created_at] date not null;`);
    this.addSql(`ALTER TABLE [BlogTags] ADD CONSTRAINT [blogtags_created_at_default] DEFAULT 'SYSDATETIME' FOR [created_at];`);

    this.addSql(`alter table [job_applications] alter column [updated_at] date;`);
  }

  override async down(): Promise<void> {
    this.addSql(`if object_id('[BlogComments]', 'U') is not null DROP TABLE [BlogComments];`);

    this.addSql(`if object_id('[Companies]', 'U') is not null DROP TABLE [Companies];`);

    this.addSql(`if object_id('[EmployerProfiles]', 'U') is not null DROP TABLE [EmployerProfiles];`);

    this.addSql(`if object_id('[JobSeekerProfiles]', 'U') is not null DROP TABLE [JobSeekerProfiles];`);

    this.addSql(`if object_id('[Roles]', 'U') is not null DROP TABLE [Roles];`);

    this.addSql(`if object_id('[UserRoles]', 'U') is not null DROP TABLE [UserRoles];`);

    this.addSql(`if object_id('[Users]', 'U') is not null DROP TABLE [Users];`);

    this.addSql(`alter table [job_applications] alter column [updated_at] nvarchar(max);`);

    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'BlogTags' and all_columns.name = 'created_at') if @constraint0 is not null exec('alter table BlogTags drop constraint ' + @constraint0);`);
    this.addSql(`alter table [BlogTags] alter column [created_at] date not null;`);
    this.addSql(`ALTER TABLE [BlogTags] ADD CONSTRAINT [blogtags_created_at_default] DEFAULT SYSDATETIME FOR [created_at];`);

    this.addSql(`alter table [job_applications] alter column [updated_at] datetime2(7);`);
  }

}
