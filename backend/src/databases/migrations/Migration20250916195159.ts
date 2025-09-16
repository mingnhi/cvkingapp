import { Migration } from '@mikro-orm/migrations';

export class Migration20250916195159 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table [UserRoles] drop constraint [UserRoles_user_id_user_user_id_foreign];`);
    this.addSql(`alter table [UserRoles] drop constraint [UserRoles_role_id_role_role_id_foreign];`);

    this.addSql(`ALTER TABLE [Roles] DROP CONSTRAINT [Roles_pkey];`);
    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'Roles' and all_columns.name = 'role_id') if @constraint0 is not null exec('alter table [Roles] drop constraint ' + @constraint0);`);
    this.addSql(`alter table [Roles] drop column [role_id];`);

    this.addSql(`ALTER TABLE [Roles] ADD CONSTRAINT [Roles_pkey] PRIMARY KEY ([id]);`);

    this.addSql(`ALTER TABLE [UserRoles] DROP CONSTRAINT [UserRoles_pkey];`);
    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'UserRoles' and all_columns.name = 'user_role_id') if @constraint0 is not null exec('alter table [UserRoles] drop constraint ' + @constraint0);`);
    this.addSql(`declare @constraint1 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'UserRoles' and all_columns.name = 'user_user_id') if @constraint1 is not null exec('alter table [UserRoles] drop constraint ' + @constraint1);`);
    this.addSql(`declare @constraint2 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'UserRoles' and all_columns.name = 'role_role_id') if @constraint2 is not null exec('alter table [UserRoles] drop constraint ' + @constraint2);`);
    this.addSql(`alter table [UserRoles] drop column [user_role_id], [user_user_id], [role_role_id];`);

    this.addSql(`ALTER TABLE [UserRoles] ADD CONSTRAINT [UserRoles_pkey] PRIMARY KEY ([id]);`);

    this.addSql(`ALTER TABLE [Users] DROP CONSTRAINT [Users_pkey];`);
    this.addSql(`declare @constraint0 varchar(100) = (select default_constraints.name from sys.all_columns join sys.tables on all_columns.object_id = tables.object_id join sys.schemas on tables.schema_id = schemas.schema_id join sys.default_constraints on all_columns.default_object_id = default_constraints.object_id where schemas.name = 'dbo' and tables.name = 'Users' and all_columns.name = 'user_id') if @constraint0 is not null exec('alter table [Users] drop constraint ' + @constraint0);`);
    this.addSql(`alter table [Users] drop column [user_id];`);

    this.addSql(`ALTER TABLE [Users] ADD CONSTRAINT [Users_pkey] PRIMARY KEY ([id]);`);
  }

  override async down(): Promise<void> {
    this.addSql(`ALTER TABLE [Roles] DROP CONSTRAINT [Roles_pkey];`);

    this.addSql(`alter table [Roles] add [role_id] int identity(1,1) not null;`);
    this.addSql(`ALTER TABLE [Roles] ADD CONSTRAINT [Roles_pkey] PRIMARY KEY ([id], [role_id]);`);

    this.addSql(`ALTER TABLE [Users] DROP CONSTRAINT [Users_pkey];`);

    this.addSql(`alter table [Users] add [user_id] int identity(1,1) not null;`);
    this.addSql(`ALTER TABLE [Users] ADD CONSTRAINT [Users_pkey] PRIMARY KEY ([id], [user_id]);`);

    this.addSql(`ALTER TABLE [UserRoles] DROP CONSTRAINT [UserRoles_pkey];`);

    this.addSql(`alter table [UserRoles] add [user_role_id] int identity(1,1) not null, [user_user_id] int not null, [role_role_id] int not null;`);
    this.addSql(`alter table [UserRoles] add constraint [UserRoles_user_id_user_user_id_foreign] foreign key ([user_id], [user_user_id]) references [Users] ([id], [user_id]) on update cascade on delete cascade;`);
    this.addSql(`alter table [UserRoles] add constraint [UserRoles_role_id_role_role_id_foreign] foreign key ([role_id], [role_role_id]) references [Roles] ([id], [role_id]) on update cascade;`);
    this.addSql(`ALTER TABLE [UserRoles] ADD CONSTRAINT [UserRoles_pkey] PRIMARY KEY ([id], [user_role_id]);`);
  }

}
