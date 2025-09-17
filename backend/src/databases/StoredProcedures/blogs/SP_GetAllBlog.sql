use JOB_PORTAL
go

create procedure [dbo].[SP_GetAllBlog]
as
begin
    select
        bp.*,
        (select name from Users where id = bp.authorId) as authorName,
        stuff((
            select ', ' + bt.name
            from BlogPostTag bpt
            join BlogTag bt on bpt.tagId = bt.id
            where bpt.blogPostId = bp.id
            for xml path('')
        ), 1, 2, '') as categories,
        (select count(*) from BlogComments where blogPostId = bp.id) as commentCount
    from BlogPosts bp
end
