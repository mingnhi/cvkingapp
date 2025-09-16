use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllBlog]
as
begin
    select * from BlogPosts
end
