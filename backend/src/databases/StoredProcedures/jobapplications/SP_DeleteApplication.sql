use JOB_PORTAL
go

create procedure [dbo].[SP_DeleteApplication]
(
    @ApplicationId int
)
as
begin
    delete from JobApplications where ApplicationId = @ApplicationId
end
