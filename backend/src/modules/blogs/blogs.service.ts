import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { BlogPosts } from '../../entities/blog-post.entity';
import { BlogTags } from '../../entities/blog-tag.entity';
import { BlogPostTags } from '../../entities/blog-post-tag.entity';
import { BlogComments } from '../../entities/blog-comment.entity';

@Injectable()
export class BlogsService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(BlogPosts)
    private readonly blogPostsRepository: EntityRepository<BlogPosts>,
    @InjectRepository(BlogTags)
    private readonly blogTagsRepository: EntityRepository<BlogTags>,
    @InjectRepository(BlogPostTags)
    private readonly blogPostTagsRepository: EntityRepository<BlogPostTags>,
    @InjectRepository(BlogComments)
    private readonly blogCommentsRepository: EntityRepository<BlogComments>
  ) {}

  // CRUD BlogPosts
  async createBlogPost(data: any, user: any): Promise<BlogPosts> {
    const blogPost = this.blogPostsRepository.create(data);
    await this.em.persistAndFlush(blogPost);
    return blogPost;
  }

  async findAllBlogPosts(): Promise<BlogPosts[]> {
    return this.blogPostsRepository.findAll();
  }

  async findOneBlogPost(id: string): Promise<BlogPosts> {
    return this.blogPostsRepository.findOne(id);
  }

  async updateBlogPost(id: string, data: any): Promise<BlogPosts> {
    const blogPost = await this.blogPostsRepository.findOne(id);
    this.blogPostsRepository.assign(blogPost, data);
    await this.em.flush();
    return blogPost;
  }

  async removeBlogPost(id: string): Promise<void> {
    const blogPost = await this.blogPostsRepository.findOne(id);
    await this.em.removeAndFlush(blogPost);
  }

  // CRUD BlogTags
  async createBlogTag(data: any): Promise<BlogTags> {
    const blogTag = this.blogTagsRepository.create(data);
    await this.em.persistAndFlush(blogTag);
    return blogTag;
  }

  async findAllBlogTags(): Promise<BlogTags[]> {
    return this.blogTagsRepository.findAll();
  }

  async findOneBlogTag(id: string): Promise<BlogTags> {
    return this.blogTagsRepository.findOne(id);
  }

  async updateBlogTag(id: string, data: any): Promise<BlogTags> {
    const blogTag = await this.blogTagsRepository.findOne(id);
    this.blogTagsRepository.assign(blogTag, data);
    await this.em.flush();
    return blogTag;
  }

  async removeBlogTag(id: string): Promise<void> {
    const blogTag = await this.blogTagsRepository.findOne(id);
    await this.em.removeAndFlush(blogTag);
  }

  // CRUD BlogComments
  async createBlogComment(data: any): Promise<BlogComments> {
    const blogComment = this.blogCommentsRepository.create(data);
    await this.em.persistAndFlush(blogComment);
    return blogComment;
  }

  async findAllBlogComments(): Promise<BlogComments[]> {
    return this.blogCommentsRepository.findAll();
  }

  async findOneBlogComment(id: string): Promise<BlogComments> {
    return this.blogCommentsRepository.findOne(id);
  }

  async updateBlogComment(id: string, data: any): Promise<BlogComments> {
    const blogComment = await this.blogCommentsRepository.findOne(id);
    this.blogCommentsRepository.assign(blogComment, data);
    await this.em.flush();
    return blogComment;
  }

  async removeBlogComment(id: string): Promise<void> {
    const blogComment = await this.blogCommentsRepository.findOne(id);
    await this.em.removeAndFlush(blogComment);
  }

  // Get blog post details
  async getBlogPostDetails(id: string): Promise<BlogPosts> {
    return this.blogPostsRepository.findOne(id);
  }

  // Search blog posts by title
  async searchBlogPostsByTitle(title: string): Promise<BlogPosts[]> {
    return this.blogPostsRepository.find({ title: { $like: `%${title}%` } });
  }
}
