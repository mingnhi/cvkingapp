use JOB_PORTAL
go

create procedure [dbo].[SP_GetApplicationsByJobId]
(
    @JobId int
)
as
begin
    select * from JobApplications where jobId = @JobId
end
