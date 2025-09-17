use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllCVTemplates]
as
begin
    select * from CVTemplates
end
