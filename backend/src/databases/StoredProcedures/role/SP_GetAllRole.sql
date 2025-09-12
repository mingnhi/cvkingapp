use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllRole]
as
begin
    select * from Roles
end