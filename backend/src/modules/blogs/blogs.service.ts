import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto, UpdateBlogDto } from './dtos/blog.dto';
import { BlogPosts } from '@entities/blog-post.entity';

@Injectable()
export class BlogsService {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  /**
   * Retrieve all blog posts with tags and category info
   * @returns List of all blog posts with combined data
   */
  async getAllBlogPosts(): Promise<any[]> {
    return this.blogsRepository.findAllWithAggregation();
  }

  /**
   * Find a blog post by ID
   * @param id ID of the blog post
   * @returns Blog post
   * @throws NotFoundException if the blog post does not exist
   */
  async getBlogPostById(id: string): Promise<BlogPosts> {
    const blogPost = await this.blogsRepository.findOne(parseInt(id));
    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return blogPost;
  }

  /**
   * Find a blog post by slug
   * @param slug Slug of the blog post
   * @returns Blog post
   * @throws NotFoundException if the blog post does not exist
   */
  async getBlogPostBySlug(slug: string): Promise<BlogPosts> {
    const blogPost = await this.blogsRepository.findBySlug(slug);
    if (!blogPost) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`);
    }
    return blogPost;
  }

  /**
   * Get detailed blog post with all related data
   * @param id ID of the blog post
   * @returns Aggregated data including blog post, tags, category, author, comments
   * @throws NotFoundException if the blog post does not exist
   */
  async getBlogPostDetail(id: string): Promise<any> {
    const detailedBlogPost = await this.blogsRepository.findByIdWithFullAggregation(parseInt(id));
    if (!detailedBlogPost) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    // Aggregate all related data in one query/response
    // This includes tags, category, author, comments based on user requirements
    // The method returns combined data with all relations
    return detailedBlogPost;
  }

  /**
   * Create a new blog post
   * @param createBlogDto Data to create the blog post
   * @returns Created blog post
   */
  async createBlogPost(createBlogDto: CreateBlogDto): Promise<BlogPosts> {
    return this.blogsRepository.create(createBlogDto);
  }

  /**
   * Update a blog post
   * @param updateBlogDto Data to update the blog post
   * @returns Updated blog post
   * @throws NotFoundException if the blog post does not exist
   */
  async updateBlogPost(updateBlogDto: UpdateBlogDto): Promise<BlogPosts> {
    const blogPost = await this.blogsRepository.update(updateBlogDto);
    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID ${updateBlogDto.id} not found`);
    }
    return blogPost;
  }

  /**
   * Search blog posts by title
   * @param title Title keyword to search
   * @returns List of blog posts matching the title
   */
  async searchPostsByTitle(title: string): Promise<BlogPosts[]> {
    return this.blogsRepository.searchByTitle(title);
  }

  /**
   * Delete a blog post
   * @param id ID of the blog post to delete
   * @throws NotFoundException if the blog post does not exist
   */
  async deleteBlogPost(id: string): Promise<void> {
    const deleted = await this.blogsRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
  }
}
