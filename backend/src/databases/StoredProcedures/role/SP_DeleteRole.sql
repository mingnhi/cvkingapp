use JOB_PORTAL
go

create procedure [dbo].[SP_DeleteRole]
(
    @Id varchar(max)
)
as
begin
    delete from Roles where id = @Id
end