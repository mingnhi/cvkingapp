use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllJobTags]
as
begin
    select * from JobTags
end
