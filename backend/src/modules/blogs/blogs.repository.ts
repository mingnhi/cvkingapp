import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { BlogPosts } from '@entities/blog-post.entity';
import { BlogTags } from '@entities/blog-tag.entity';
import { BlogPostTags } from '@entities/blog-post-tag.entity';
import { BlogComments } from '@entities/blog-comment.entity';
import { CreateBlogDto, UpdateBlogDto } from './dtos/blog.dto';

@Injectable()
export class BlogsRepository {
  // constructor(
  //   @InjectRepository(BlogPosts)
  //   private readonly blogRepository: EntityRepository<BlogPosts>,
  //   private readonly em: EntityManager
  // ) {}
  // /**
  //  * Retrieve all blog posts
  //  * @returns List of all blog posts
  //  */
  // async findAll(): Promise<BlogPosts[]> {
  //   const results = await this.em.getConnection().execute('EXEC SP_GetAllBlog');
  //   return results ?? [];
  // }
  // /**
  //  * Find a blog post by ID
  //  * @param id ID of the blog post
  //  * @returns Blog post or null if not found
  //  */
  // async findOne(id: number): Promise<BlogPosts | null> {
  //   const result = await this.em
  //     .getConnection()
  //     .execute('EXEC SP_GetBlogPostById ?', [id]);
  //   const blogPost = result?.[0] ?? result;
  //   return blogPost ?? null;
  // }
  // /**
  //  * Create a new blog post
  //  * @param createBlogDto Data to create the blog post
  //  * @returns Created blog post
  //  */
  // async create(createBlogDto: CreateBlogDto): Promise<BlogPosts> {
  //   const result = await this.em
  //     .getConnection()
  //     .execute('EXEC SP_InsertBlogPost ?, ?, ?, ?, ?, ?', [
  //       createBlogDto.title,
  //       createBlogDto.slug,
  //       createBlogDto.content,
  //       createBlogDto.excerpt,
  //       createBlogDto.coverImageUrl,
  //       createBlogDto.authorId,
  //     ]);
  //   const newBlogPost = result?.[0] ?? result;
  //   return newBlogPost as BlogPosts;
  // }
  // /**
  //  * Update a blog post
  //  * @param updateBlogDto Data to update the blog post
  //  * @returns Updated blog post or null if not found
  //  */
  // async update(updateBlogDto: UpdateBlogDto): Promise<BlogPosts | null> {
  //   await this.em
  //     .getConnection()
  //     .execute('EXEC SP_UpdateBlogPost ?, ?, ?, ?, ?, ?, ?', [
  //       updateBlogDto.id,
  //       updateBlogDto.title,
  //       updateBlogDto.slug,
  //       updateBlogDto.content,
  //       updateBlogDto.excerpt,
  //       updateBlogDto.coverImageUrl,
  //       updateBlogDto.authorId,
  //     ]);
  //   return this.findOne(parseInt(updateBlogDto.id));
  // }
  // /**
  //  * Search blog posts by title
  //  * @param title Title keyword to search
  //  * @returns List of blog posts matching the title
  //  */
  // async searchByTitle(title: string): Promise<BlogPosts[]> {
  //   return this.blogRepository.find({ title: { $like: `%${title}%` } });
  // }
  // /**
  //  * Find a blog post by slug
  //  * @param slug Slug of the blog post
  //  * @returns Blog post or null if not found
  //  */
  // async findBySlug(slug: string): Promise<BlogPosts | null> {
  //   return this.blogRepository.findOne({ slug });
  // }
  // /**
  //  * Delete a blog post
  //  * @param id ID of the blog post to delete
  //  * @returns True if deletion is successful, false if not found
  //  */
  // async delete(id: string): Promise<boolean> {
  //   await this.em.getConnection().execute('EXEC SP_DeleteBlogPost ?', [id]);
  //   return true;
  // }
  // /**
  //  * Retrieve all blog posts with aggregated data (tags, author)
  //  * @returns List of all blog posts with combined data
  //  */
  // async findAllWithAggregation(): Promise<any[]> {
  //   // Use MikroORM to get posts
  //   const posts = await this.blogRepository.find({});
  //   // Manually aggregate tags for each post using the junction table
  //   const results = [];
  //   for (const post of posts) {
  //     // Get tag IDs for this post
  //     const tagRelations = await this.em.find(BlogPostTags, { blogPostId: post.blogPostId });
  //     // Get tag details
  //     const tagIds = tagRelations.map((relation: any) => relation.blogTagId);
  //     const tags = tagIds.length > 0 ? await this.em.find(BlogTags, { blogTagId: { $in: tagIds } }) : [];
  //     results.push({
  //       ...post,
  //       tags: tags
  //     });
  //   }
  //   return results;
  // }
  // /**
  //  * Get detailed blog post with all related data using MikroORM aggregation
  //  * @param id ID of the blog post
  //  * @returns Aggregated data including blog post, tags, author, comments
  //  */
  // async findByIdWithFullAggregation(id: number): Promise<any> {
  //   // Get the blog post with basic relations
  //   const post = await this.blogRepository.findOne({ blogPostId: id });
  //   if (!post) return null;
  //   // Get tags for this post
  //   const tagRelations = await this.em.find(BlogPostTags, { blogPostId: id });
  //   const tagIds = tagRelations.map((relation: any) => relation.blogTagId);
  //   const tags = tagIds.length > 0 ? await this.em.find(BlogTags, { blogTagId: { $in: tagIds } }) : [];
  //   // Get comments for this post (approving comments using MikroORM)
  //   const comments = await this.em.find(BlogComments, { blogPostId: id, isApproved: true });
  //   return {
  //     ...post,
  //     tags: tags,
  //     comments: comments
  //   };
  // }
}
