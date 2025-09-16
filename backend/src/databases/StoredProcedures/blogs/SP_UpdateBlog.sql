use JOB_PORTAL
go

create procedure [dbo].[SP_UpdateBlog]
(
    @BlogPostId INT,
    @Title NVARCHAR(500),
    @Slug NVARCHAR(500),
    @Content NVARCHAR(MAX),
    @Excerpt NVARCHAR(1000),
    @CoverImageUrl NVARCHAR(1000),
    @IsPublished BIT,
    @PublishedAt DATETIME2
)
as
begin
    update BlogPosts
        set Title = @Title, 
            Slug = @Slug, 
            Content = @Content, 
            Excerpt = @Excerpt, 
            CoverImageUrl = @CoverImageUrl, 
            IsPublished = @IsPublished, 
            PublishedAt = @PublishedAt, 
            UpdatedAt = SYSUTCDATETIME()
    where BlogPostId = @BlogPostId
end
