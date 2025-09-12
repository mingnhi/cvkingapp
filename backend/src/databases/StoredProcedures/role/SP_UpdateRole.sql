use JOB_PORTAL
go

create procedure [dbo].[SP_UpdateRole]
(
    @Id varchar(max),
    @Name varchar(max),
    @Description nvarchar(max)
)
as
begin
    update Roles
        set name = @Name, description = @Description, updated_at =SYSDATETIMEOFFSET()
    where id = @Id
end