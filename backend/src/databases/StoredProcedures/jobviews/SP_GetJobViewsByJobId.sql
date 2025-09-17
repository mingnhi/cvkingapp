use JOB_PORTAL
go

create procedure [dbo].[SP_GetJobViewsByJobId]
(
    @JobId int
)
as
begin
    select * from JobViews where jobId = @JobId
end
