use JOB_PORTAL
go

create procedure [dbo].[SP_DeleteJob]
(
    @JobId int
)
as
begin
    delete from Jobs where JobId = @JobId
end
