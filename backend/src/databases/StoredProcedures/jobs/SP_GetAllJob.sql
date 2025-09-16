use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllJob]
as
begin
    select * from Jobs
end
