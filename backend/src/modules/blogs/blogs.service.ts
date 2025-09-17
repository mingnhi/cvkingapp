import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto, UpdateBlogDto } from './dtos/blog.dto';
import { BlogPosts } from '@entities/blog-post.entity';

@Injectable()
export class BlogsService {
  //    post
  //    * @returns Aggregated data including blog post, tags, category, author, comments
  //    * @throws NotFoundException if the blog post does not exist
  //    */constructor(
  //     private readonly em: EntityManager,
  //     @InjectRepository(BlogPosts)
  //     private readonly blogPostsRepository: EntityRepository<BlogPosts>,
  //     @InjectRepository(BlogTags)
  //     private readonly blogTagsRepository: EntityRepository<BlogTags>,
  //     @InjectRepository(BlogPostTags)
  //     private readonly blogPostTagsRepository: EntityRepository<BlogPostTags>,
  //     @InjectRepository(BlogComments)
  //     private readonly blogCommentsRepository: EntityRepository<BlogComments>
  //   ) {}
  //   /**
  //    * Retrieve all blog posts with tags and category info
  //    * @returns List of all blog posts with combined data
  //    */
  //   async getAllBlogPosts(): Promise<any[]> {
  //     return this.blogsRepository.findAllWithAggregation();
  //   }
  //   /**
  //    * Find a blog post by ID
  //    * @param id ID of the blog post
  //    * @returns Blog post
  //    * @throws NotFoundException if the blog post does not exist
  //    */
  //   async getBlogPostById(id: string): Promise<BlogPosts> {
  //     const blogPost = await this.blogsRepository.findOne(parseInt(id));
  //     if (!blogPost) {
  //       throw new NotFoundException(`Blog post with ID ${id} not found`);
  //     }
  //     return blogPost;
  //   }
  //   /**
  //    * Find a blog post by slug
  //    * @param slug Slug of the blog post
  //    * @returns Blog post
  //    * @throws NotFoundException if the blog post does not exist
  //    */
  //   async getBlogPostBySlug(slug: string): Promise<BlogPosts> {
  //     const blogPost = await this.blogsRepository.findBySlug(slug);
  //     if (!blogPost) {
  //       throw new NotFoundException(`Blog post with slug "${slug}" not found`);
  //     }
  //     return blogPost;
  //   }
  //   /**
  //    * Get detailed blog post with all related data
  //    * @param id ID of the blog
  //   async getBlogPostDetail(id: string): Promise<any> {
  //     const detailedBlogPost =
  //       await this.blogsRepository.findByIdWithFullAggregation(parseInt(id));
  //     if (!detailedBlogPost) {
  //       throw new NotFoundException(`Blog post with ID ${id} not found`);
  //     }
  //     // Aggregate all related data in one query/response
  //     // This includes tags, category, author, comments based on user requirements
  //     // The method returns combined data with all relations
  //     return detailedBlogPost;
  //   }
  //   /**
  //    * Create a new blog post
  //    * @param createBlogDto Data to create the blog post
  //    * @returns Created blog post
  //    */
  //   async createBlogPost(createBlogDto: CreateBlogDto): Promise<BlogPosts> {
  //     return this.blogsRepository.create(createBlogDto);
  //   }
  //   /**
  //    * Update a blog post
  //    * @param updateBlogDto Data to update the blog post
  //    * @returns Updated blog post
  //    * @throws NotFoundException if the blog post does not exist
  //    */
  //   async updateBlogPost(updateBlogDto: UpdateBlogDto): Promise<BlogPosts> {
  //     const blogPost = await this.blogsRepository.update(updateBlogDto);
  //     if (!blogPost) {
  //       throw new NotFoundException(
  //         `Blog post with ID ${updateBlogDto.id} not found`
  //       );
  //     }
  //     return blogPost;
  //   }
  //   /**
  //    * Search blog posts by title
  //    * @param title Title keyword to search
  //    * @returns List of blog posts matching the title
  //    */
  //   async searchPostsByTitle(title: string): Promise<BlogPosts[]> {
  //     return this.blogsRepository.searchByTitle(title);
  //   }
  //   async updateBlogTag(id: string, data: any): Promise<BlogTags> {
  //     const blogTag = await this.blogTagsRepository.findOne(id);
  //     this.blogTagsRepository.assign(blogTag, data);
  //     await this.em.flush();
  //     return blogTag;
  //   }
  //   async removeBlogTag(id: string): Promise<void> {
  //     const blogTag = await this.blogTagsRepository.findOne(id);
  //     await this.em.removeAndFlush(blogTag);
  //   }
  //   // CRUD BlogComments
  //   async createBlogComment(data: any): Promise<BlogComments> {
  //     const blogComment = this.blogCommentsRepository.create(data);
  //     await this.em.persistAndFlush(blogComment);
  //     return blogComment;
  //   }
  //   async findAllBlogComments(): Promise<BlogComments[]> {
  //     return this.blogCommentsRepository.findAll();
  //   }
  //   async findOneBlogComment(id: string): Promise<BlogComments> {
  //     return this.blogCommentsRepository.findOne(id);
  //   }
  //   async updateBlogComment(id: string, data: any): Promise<BlogComments> {
  //     const blogComment = await this.blogCommentsRepository.findOne(id);
  //     this.blogCommentsRepository.assign(blogComment, data);
  //     await this.em.flush();
  //     return blogComment;
  //   }
  //   async removeBlogComment(id: string): Promise<void> {
  //     const blogComment = await this.blogCommentsRepository.findOne(id);
  //     await this.em.removeAndFlush(blogComment);
  //   }
  //   // Get blog post details
  //   async getBlogPostDetails(id: string): Promise<BlogPosts> {
  //     return this.blogPostsRepository.findOne(id);
  //   }
  //   // Search blog posts by title
  //   async searchBlogPostsByTitle(title: string): Promise<BlogPosts[]> {
  //     return this.blogPostsRepository.find({ title: { $like: `%${title}%` } });
  //   }
}
