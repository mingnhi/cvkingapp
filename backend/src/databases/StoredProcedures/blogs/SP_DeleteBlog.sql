use JOB_PORTAL
go

create procedure [dbo].[SP_DeleteBlog]
(
    @BlogPostId int
)
as
begin
    delete from BlogPosts where BlogPostId = @BlogPostId
end
