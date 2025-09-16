use JOB_PORTAL
go

create procedure [dbo].[SP_GetJobById]
(
    @JobId int
)
as
begin
    select * from Jobs where JobId = @JobId
end
