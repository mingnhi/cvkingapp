use JOB_PORTAL
go

create procedure [dbo].[SP_UpdateApplication]
(
    @ApplicationId int,
    @JobId int,
    @JobSeekerProfileId int,
    @CVId int = null,
    @CoverLetter nvarchar(max) = null,
    @Status nvarchar(50)
)
as
begin
    update JobApplications set
        JobId = @JobId,
        JobSeekerProfileId = @JobSeekerProfileId,
        CVId = @CVId,
        CoverLetter = @CoverLetter,
        Status = @Status,
        UpdatedAt = SYSUTCDATETIME()
    where ApplicationId = @ApplicationId

    select * from JobApplications where ApplicationId = @ApplicationId
end
