use cvkingapp
go

create procedure [dbo].[SP_GetAllJobViews]
as
begin
    select * from jobviews
end
