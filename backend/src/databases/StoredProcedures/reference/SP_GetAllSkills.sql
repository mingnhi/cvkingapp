use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllSkills]
as
begin
    select * from Skills
end
