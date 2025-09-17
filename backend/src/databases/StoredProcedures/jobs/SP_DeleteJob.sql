use JOB_DB
go

create procedure [dbo].[SP_DeleteJob]
(
    @JobId varchar(max)
)
as
begin
    -- Delete related job skills
    delete from JobSkills where job_id = @JobId

    -- Delete related job tags
    delete from JobJobTags where job_id = @JobId

    -- Delete related job views
    delete from JobViews where job_id = @JobId

    -- Delete related saved jobs
    delete from saved_jobs where job_id = @JobId

    -- Finally delete the job
    delete from Jobs where id = @JobId
end
go
