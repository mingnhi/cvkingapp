use JOB_PORTAL
go

create procedure [dbo].[SP_GetBlogBySlug]
(
    @slug varchar(500)
)
as
begin
    select (
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
            (select count(*) from BlogComments where blogPostId = bp.id) as commentCount,
            (
                select bc.id, bc.content, bc.createdAt, bc.guestName, bc.isApproved,
                       (select name from Users where id = bc.userId) as commentAuthorName
                from BlogComments bc
                where bc.blogPostId = bp.id and bc.isApproved = 1
                order by bc.createdAt desc
                for json path
            ) as comments
        from BlogPosts bp
        where bp.slug = @slug
        for json path, without_array_wrapper
    ) as blogDetail
end
