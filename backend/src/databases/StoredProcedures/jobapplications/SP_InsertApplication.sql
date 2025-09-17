use JOB_PORTAL
go

create procedure [dbo].[SP_InsertApplication]
(
    @JobId int,
    @JobSeekerProfileId int,
    @CVId int = null,
    @CoverLetter nvarchar(max) = null,
    @Status nvarchar(50) = 'Pending'
)
as
begin
    insert into JobApplications(JobId, JobSeekerProfileId, CVId, CoverLetter, Status)
    values (@JobId, @JobSeekerProfileId, @CVId, @CoverLetter, @Status)

    declare @ApplicationId int = SCOPE_IDENTITY()
    select * from JobApplications where ApplicationId = @ApplicationId
end
