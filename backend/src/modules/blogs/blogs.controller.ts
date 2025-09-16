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
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dtos/blog.dto';
import { BlogPosts } from '@entities/blog-post.entity';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  /**
   * Retrieve all blog posts
   * @returns List of all blog posts wrapped in ApiResponse
   */
  @Get()
  async findAll(): Promise<ApiResponse<BlogPosts[]>> {
    const blogs = await this.blogsService.getAllBlogPosts();
    return {
      status: 'success',
      message: 'Successfully retrieved all blog posts',
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
    const blog = await this.blogsService.getBlogPostById(id);
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
    const blog = await this.blogsService.createBlogPost(createBlogDto);
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
    const blog = await this.blogsService.updateBlogPost(updateBlogDto);
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
    await this.blogsService.deleteBlogPost(id);
    return {
      status: 'success',
      message: `Blog post with ID ${id} deleted successfully`,
      data: null,
    };
  }
}
