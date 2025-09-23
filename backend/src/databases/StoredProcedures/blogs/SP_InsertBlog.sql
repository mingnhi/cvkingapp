use JOB_PORTAL
go

create procedure [dbo].[SP_InsertBlog]
(
    @Title NVARCHAR(500),
    @Slug NVARCHAR(500),
    @Content NVARCHAR(MAX),
    @Excerpt NVARCHAR(1000),
    @CoverImageUrl NVARCHAR(1000),
    @AuthorUserId INT,
    @IsPublished BIT,
    @PublishedAt DATETIME2
)
as
begin
    insert into BlogPosts(Title, Slug, Content, Excerpt, CoverImageUrl, AuthorUserId, IsPublished, PublishedAt, CreatedAt)
    values (@Title, @Slug, @Content, @Excerpt, @CoverImageUrl, @AuthorUserId, @IsPublished, @PublishedAt, SYSUTCDATETIME())

    SELECT * FROM BlogPosts WHERE BlogPostId = SCOPE_IDENTITY();
end
