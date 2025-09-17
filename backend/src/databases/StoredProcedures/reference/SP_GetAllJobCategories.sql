use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllJobCategories]
as
begin
    select * from JobCategories
end
