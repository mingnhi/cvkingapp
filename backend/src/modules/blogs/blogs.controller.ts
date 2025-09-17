import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ValidationPipe,
  ParseUUIDPipe,
  Put,
  Query,
} from '@nestjs/common';
import { CreateBlogDto, UpdateBlogDto } from './dtos/blog.dto';
import { BlogPosts } from '@entities/blog-post.entity';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';
import { BlogsRepository } from './blogs.repository';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  /**
   * Retrieve all blog posts or search by title
   * @param title Optional title query parameter for searching
   * @returns List of all blog posts or filtered results wrapped in ApiResponse
   */
  @Get()
  async findAll(
    @Query('title') title?: string
  ): Promise<ApiResponse<BlogPosts[]>> {
    const blogs = title
      ? await this.blogsRepository.searchByTitle(title)
      : await this.blogsRepository.findAll();
    return {
      status: 'success',
      message: title
        ? `Successfully searched blog posts with title containing "${title}"`
        : 'Successfully retrieved all blog posts',
      data: blogs,
      meta: { count: blogs.length },
    };
  }

  /**
   * Find a blog post by ID
   * @param id ID of the blog post
   * @returns Blog post wrapped in ApiResponse
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<BlogPosts>> {
    const blog = await this.blogsRepository.findOne(id);
    return {
      status: 'success',
      message: `Successfully retrieved blog post with ID ${id}`,
      data: blog,
    };
  }

  /**
   * Create a new blog post
   * @param createBlogDto Data to create the blog post
   * @returns Created blog post wrapped in ApiResponse
   */
  @Post()
  async create(
    @Body(ValidationPipe) createBlogDto: CreateBlogDto
  ): Promise<ApiResponse<BlogPosts>> {
    const blog = await this.blogsRepository.create(createBlogDto);
    return {
      status: 'success',
      message: 'Blog post created successfully',
      data: blog,
    };
  }

  /**
   * Update a blog post
   * @param updateBlogDto Data to update the blog post
   * @returns Updated blog post wrapped in ApiResponse
   */
  @Put()
  async update(
    @Body(ValidationPipe) updateBlogDto: UpdateBlogDto
  ): Promise<ApiResponse<BlogPosts>> {
    const blog = await this.blogsRepository.update(updateBlogDto);
    return {
      status: 'success',
      message: `Blog post with ID ${updateBlogDto.id} updated successfully`,
      data: blog,
    };
  }

  /**
   * Delete a blog post
   * @param id ID of the blog post to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.blogsRepository.delete(id);
    return {
      status: 'success',
      message: `Blog post with ID ${id} deleted successfully`,
      data: null,
    };
  }
  //gộp chung
  @Get('posts')
  async findAllBlogPosts(@Query('title') title?: string): Promise<BlogPosts[]> {
    return title
      ? await this.blogsRepository.searchByTitle(title)
      : await this.blogsRepository.findAll();
  }
}
