use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllJobViews]
as
begin
    select * from JobViews
end
