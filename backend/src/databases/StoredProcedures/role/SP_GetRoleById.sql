use JOB_PORTAL
go

create procedure [dbo].[SP_GetRoleById]
(
    @Id varchar(max)
)
as
begin
    select * from Roles where id = @Id
end