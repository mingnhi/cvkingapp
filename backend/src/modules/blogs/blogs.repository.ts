import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BlogPosts } from '@entities/blog-post.entity';
import { CreateBlogDto, UpdateBlogDto } from './dtos/blog.dto';

@Injectable()
export class BlogsRepository {
  constructor(
    @InjectRepository(BlogPosts)
    private readonly blogRepository: EntityRepository<BlogPosts>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all blog posts
   * @returns List of all blog posts
   */
  async findAll(): Promise<BlogPosts[]> {
    const results = await this.em.getConnection().execute('EXEC SP_GetAllBlogPost');
    return results ?? [];
  }

  /**
   * Find a blog post by ID
   * @param id ID of the blog post
   * @returns Blog post or null if not found
   */
  async findOne(id: string): Promise<BlogPosts | null> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetBlogPostById ?', [id]);
    const blogPost = result?.[0] ?? result;
    return blogPost ?? null;
  }

  /**
   * Create a new blog post
   * @param createBlogDto Data to create the blog post
   * @returns Created blog post
   */
  async create(createBlogDto: CreateBlogDto): Promise<BlogPosts> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_InsertBlogPost ?, ?, ?, ?, ?, ?', [
        createBlogDto.title,
        createBlogDto.slug,
        createBlogDto.content,
        createBlogDto.excerpt,
        createBlogDto.coverImageUrl,
        createBlogDto.author,
      ]);

    const newBlogPost = result?.[0] ?? result;
    return newBlogPost as BlogPosts;
  }

  /**
   * Update a blog post
   * @param updateBlogDto Data to update the blog post
   * @returns Updated blog post or null if not found
   */
  async update(updateBlogDto: UpdateBlogDto): Promise<BlogPosts | null> {
    await this.em
      .getConnection()
      .execute('EXEC SP_UpdateBlogPost ?, ?, ?, ?, ?, ?, ?', [
        updateBlogDto.id,
        updateBlogDto.title,
        updateBlogDto.slug,
        updateBlogDto.content,
        updateBlogDto.excerpt,
        updateBlogDto.coverImageUrl,
        updateBlogDto.author,
      ]);
    return this.findOne(updateBlogDto.id);
  }

  /**
   * Search blog posts by title
   * @param title Title keyword to search
   * @returns List of blog posts matching the title
   */
  async searchByTitle(title: string): Promise<BlogPosts[]> {
    return this.blogRepository.find({ title: { $like: `%${title}%` } });
  }

  /**
   * Delete a blog post
   * @param id ID of the blog post to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteBlogPost ?', [id]);
    return true;
  }
}
