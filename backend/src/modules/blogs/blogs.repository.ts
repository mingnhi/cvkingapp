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

  async findAll(): Promise<BlogPosts[]> {
    return this.blogRepository.findAll();
  }

  async findOne(id: string): Promise<BlogPosts | null> {
    return this.blogRepository.findOne({ id });
  }

  async create(createBlogDto: CreateBlogDto): Promise<BlogPosts> {
    const blog = this.blogRepository.create({
      ...createBlogDto,
      id: undefined,
    });
    await this.em.persistAndFlush(blog);
    return blog;
  }

  async update(updateBlogDto: UpdateBlogDto): Promise<BlogPosts | null> {
    const blog = await this.blogRepository.findOne({ id: updateBlogDto.id });
    if (!blog) {
      return null;
    }
    // Update fields here
    Object.assign(blog, updateBlogDto);
    await this.em.flush();
    return blog;
  }

  async delete(id: string): Promise<boolean> {
    const blog = await this.blogRepository.findOne({ id });
    if (!blog) {
      return false;
    }
    await this.em.removeAndFlush(blog);
    return true;
  }
}
