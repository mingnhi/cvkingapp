use cvkingapp
go

create procedure [dbo].[SP_GetAllCVTemplates]
as
begin
    select * from CVTemplates
end
