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
import { BlogsService } from './blogs.service';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  // constructor(private readonly blogsService: BlogsService) {}
  // /**
  //  * Retrieve all blog posts or search by title
  //  * @param title Optional title query parameter for searching
  //  * @returns List of all blog posts or filtered results wrapped in ApiResponse
  //  */
  // @Get()
  // async findAll(
  //   @Query('title') title?: string
  // ): Promise<ApiResponse<any[]>> {
  //   const blogs = title
  //     ? await this.blogsService.searchPostsByTitle(title)
  //     : await this.blogsService.getAllBlogPosts();
  //   return {
  //     status: 'success',
  //     message: title
  //       ? `Successfully searched blog posts with title containing "${title}"`
  //       : 'Successfully retrieved all blog posts',
  //     data: blogs,
  //     meta: { count: blogs.length },
  //   };
  // }
  // /**
  //  * Find a blog post by slug
  //  * @param slug Slug of the blog post
  //  * @returns Blog post wrapped in ApiResponse
  //  */
  // @Get('slug/:slug')
  // async findBySlug(@Param('slug') slug: string): Promise<ApiResponse<any>> {
  //   const blog = await this.blogsService.getBlogPostBySlug(slug);
  //   return {
  //     status: 'success',
  //     message: `Successfully retrieved blog post with slug "${slug}"`,
  //     data: blog,
  //   };
  // }
  // /**
  //  * Find a blog post by ID with detailed aggregated data
  //  * @param id ID of the blog post
  //  * @returns Detailed blog post data wrapped in ApiResponse
  //  */
  // @Get(':id')
  // async findOne(
  //   @Param('id', ParseUUIDPipe) id: string
  // ): Promise<ApiResponse<any>> {
  //   const blog = await this.blogsService.getBlogPostDetail(id); // Using aggregated detail method
  //   return {
  //     status: 'success',
  //     message: `Successfully retrieved detailed blog post with ID ${id}`,
  //     data: blog,
  //   };
  // }
  // /**
  //  * Create a new blog post
  //  * @param createBlogDto Data to create the blog post
  //  * @returns Created blog post wrapped in ApiResponse
  //  */
  // @Post()
  // async create(
  //   @Body(ValidationPipe) createBlogDto: CreateBlogDto
  // ): Promise<ApiResponse<BlogPosts>> {
  //   const blog = await this.blogsService.createBlogPost(createBlogDto);
  //   return {
  //     status: 'success',
  //     message: 'Blog post created successfully',
  //     data: blog,
  //   };
  // }
  // /**
  //  * Update a blog post
  //  * @param updateBlogDto Data to update the blog post
  //  * @returns Updated blog post wrapped in ApiResponse
  //  */
  // @Put()
  // async update(
  //   @Body(ValidationPipe) updateBlogDto: UpdateBlogDto
  // ): Promise<ApiResponse<BlogPosts>> {
  //   const blog = await this.blogsService.updateBlogPost(updateBlogDto);
  //   return {
  //     status: 'success',
  //     message: `Blog post with ID ${updateBlogDto.id} updated successfully`,
  //     data: blog,
  //   };
  // }
  // /**
  //  * Delete a blog post
  //  * @param id ID of the blog post to delete
  //  * @returns Success message wrapped in ApiResponse
  //  */
  // @Delete(':id')
  // async delete(
  //   @Param('id', ParseUUIDPipe) id: string
  // ): Promise<ApiResponse<null>> {
  //   await this.blogsService.deleteBlogPost(id);
  //   return {
  //     status: 'success',
  //     message: `Blog post with ID ${id} deleted successfully`,
  //     data: null,
  //   };
  // }
  // //gộp chung
  // @Get('posts')
  // async findAllBlogPosts(@Query('title') title?: string): Promise<any[]> {
  //   return title
  //     ? await this.blogsService.searchPostsByTitle(title)
  //     : await this.blogsService.getAllBlogPosts();
  // }
}
