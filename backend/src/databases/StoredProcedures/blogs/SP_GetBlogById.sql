use JOB_PORTAL
go

create procedure [dbo].[SP_GetBlogById]
(
    @BlogPostId int
)
as
begin
    select * from BlogPosts where BlogPostId = @BlogPostId
end
