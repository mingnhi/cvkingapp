import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { CreateBlogCommentDto, UpdateBlogCommentDto } from './dto/blog-comments.dto';
import extractJson, { extractJsonArray } from 'src/utils/extractJson';

@Injectable()
export class BlogCommentsRepository {
  constructor(private readonly em: EntityManager) {}

  /**
   * Find all comments with optional filtering
   * @param filters Optional filters for the query
   * @returns List of blog comments
   */
  async findAll(filters?: { blogPostId?: string; userId?: string; isApproved?: boolean }): Promise<any[]> {
    const result = await this.em.getConnection().execute('EXEC dbo.SP_GetAllBlogComments');
    const allComments = extractJsonArray(result);

    // Apply filters in memory since SP doesn't have filters
    let filtered = allComments;

    if (filters?.blogPostId) {
      filtered = filtered.filter(c => c.blogPostId === filters.blogPostId);
    }

    if (filters?.userId) {
      filtered = filtered.filter(c => c.userId === filters.userId);
    }

    if (filters?.isApproved !== undefined) {
      filtered = filtered.filter(c => c.isApproved === filters.isApproved);
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Find a comment by ID
   * @param id Comment ID
   * @returns Blog comment
   */
  async findById(id: string): Promise<any | null> {
    const result = await this.em.getConnection().execute('EXEC dbo.SP_GetBlogCommentById ?', [id]);
    return extractJson(result[0]) || null;
  }

  /**
   * Create a new comment
   * @param data Comment data
   * @returns Created comment
   */
  async create(data: CreateBlogCommentDto): Promise<any> {
    // Validate that either UserId or GuestName is provided (SP requirement)
    if (!data.UserId && !data.GuestName) {
      throw new Error('Either UserId or GuestName must be provided');
    }

    // Map the data to match stored procedure parameter order
    // SP_InsertBlogComment expects: @Content, @BlogPostId, @UserId, @GuestName
    const result = await this.em.getConnection().execute(
      'EXEC dbo.SP_InsertBlogComment ?,?,?,?',
      [data.Content, data.BlogPostId, data.UserId || null, data.GuestName || null]
    );

    const rawResult = result[0];
    const comment = extractJson(rawResult);

    // Check if the stored procedure returned an error
    if (comment && comment.error) {
      throw new Error(comment.error);
    }

    // Handle ParentCommentId for reply comments (not supported in current SP)
    if (data.ParentCommentId && comment) {
      // For now, we'll just return the comment as-is since the SP doesn't support parent comments
      // In a full implementation, you'd need to modify the SP to handle parent comments
      console.warn('ParentCommentId is not supported in current stored procedure');
    }

    return comment;
  }

  /**
   * Update a comment
   * @param id Comment ID
   * @param data Updated data
   * @returns Updated comment
   */
  async update(id: string, data: UpdateBlogCommentDto): Promise<any | null> {
    const result = await this.em.getConnection().execute(
      'EXEC dbo.SP_UpdateBlogComment ?,?',
      [id, data.Content]
    );
    return extractJson(result[0]);
  }

  /**
   * Delete a comment
   * @param id Comment ID
   * @returns True if deletion was successful
   */
  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC dbo.SP_DeleteBlogComment ?', [id]);
    return true;
  }

  /**
   * Approve a comment
   * @param id Comment ID
   * @returns Updated comment
   */
  async approve(id: string): Promise<any | null> {
    const result = await this.em.getConnection().execute(
      'EXEC dbo.SP_SetBlogCommentApproval ?,?',
      [id, 1]
    );
    return extractJson(result[0]);
  }

  /**
   * Reject a comment (unapprove)
   * @param id Comment ID
   * @returns Updated comment
   */
  async reject(id: string): Promise<any | null> {
    const result = await this.em.getConnection().execute(
      'EXEC dbo.SP_SetBlogCommentApproval ?,?',
      [id, 0]
    );
    return extractJson(result[0]);
  }

  /**
   * Get comments for a specific blog post
   * @param blogPostId Blog post ID
   * @param approvedOnly Only return approved comments
   * @returns List of comments
   */
  async getCommentsByBlogPost(blogPostId: string, approvedOnly: boolean = true): Promise<any[]> {
    const comments = await this.findAll({ blogPostId, isApproved: approvedOnly ? true : undefined });
    return comments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  /**
   * Get comment count for a blog post
   * @param blogPostId Blog post ID
   * @param approvedOnly Count only approved comments
   * @returns Comment count
   */
  async getCommentCount(blogPostId: string, approvedOnly: boolean = true): Promise<number> {
    const comments = await this.getCommentsByBlogPost(blogPostId, approvedOnly);
    return comments.length;
  }

  /**
   * Get comments by user
   * @param userId User ID
   * @param approvedOnly Only return approved comments
   * @returns List of user's comments
   */
  async getCommentsByUser(userId: string, approvedOnly: boolean = true): Promise<any[]> {
    return this.findAll({ userId, isApproved: approvedOnly ? true : undefined });
  }
}
