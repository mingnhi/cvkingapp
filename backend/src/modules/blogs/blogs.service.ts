import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { CreateBlogDto, UpdateBlogDto } from './dtos/blog.dto';
import { BlogPosts } from '@entities/blog-post.entity';

@Injectable()
export class BlogsService {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  /**
   * Retrieve all blog posts
   * @returns List of all blog posts
   */
  async getAllBlogPosts(): Promise<BlogPosts[]> {
    return this.blogsRepository.findAll();
  }

  /**
   * Find a blog post by ID
   * @param id ID of the blog post
   * @returns Blog post
   * @throws NotFoundException if the blog post does not exist
   */
  async getBlogPostById(id: string): Promise<BlogPosts> {
    const blogPost = await this.blogsRepository.findOne(id);
    if (!blogPost) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }
    return blogPost;
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
