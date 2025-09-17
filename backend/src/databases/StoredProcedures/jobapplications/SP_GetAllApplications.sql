use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllApplications]
as
begin
    select
        ja.*,
        (select title from Jobs where jobId = ja.jobId) as jobTitle,
        (select email from Users where id = ja.jobSeekerId) as applicantEmail,
        (select name from Companies where id = (select companyId from Jobs where jobId = ja.jobId)) as companyName
    from JobApplications ja
end
