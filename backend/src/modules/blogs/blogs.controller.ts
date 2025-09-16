import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogPostDto } from './dtos/create-blog-post.dto';
import { UpdateBlogPostDto } from './dtos/update-blog-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@modules/auth/roles.decorator';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // BlogPost endpoints
  @Post('posts')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Admin')
  createBlogPost(@Body() createBlogPostDto: CreateBlogPostDto, @Req() req) {
    return this.blogsService.createBlogPost(createBlogPostDto, req.user);
  }

  @Get('posts')
  findAllBlogPosts() {
    return this.blogsService.findAllBlogPosts();
  }

  @Get('posts/search')
  searchBlogPosts(@Query('title') title: string) {
    return this.blogsService.searchBlogPostsByTitle(title);
  }

  @Get('posts/:id')
  findOneBlogPost(@Param('id') id: string) {
    return this.blogsService.getBlogPostDetails(id);
  }

  @Patch('posts/:id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Admin')
  updateBlogPost(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto
  ) {
    return this.blogsService.updateBlogPost(id, updateBlogPostDto);
  }

  @Delete('posts/:id')
  @UseGuards(AuthGuard('jwt'))
  @Roles('Admin')
  removeBlogPost(@Param('id') id: string) {
    return this.blogsService.removeBlogPost(id);
  }

  // BlogTag endpoints
  @Post('tags')
  createBlogTag(@Body() createBlogTagDto: any) {
    return this.blogsService.createBlogTag(createBlogTagDto);
  }

  @Get('tags')
  findAllBlogTags() {
    return this.blogsService.findAllBlogTags();
  }

  @Get('tags/:id')
  findOneBlogTag(@Param('id') id: string) {
    return this.blogsService.findOneBlogTag(id);
  }

  @Patch('tags/:id')
  updateBlogTag(@Param('id') id: string, @Body() updateBlogTagDto: any) {
    return this.blogsService.updateBlogTag(id, updateBlogTagDto);
  }

  @Delete('tags/:id')
  removeBlogTag(@Param('id') id: string) {
    return this.blogsService.removeBlogTag(id);
  }

  // BlogComment endpoints
  @Post('comments')
  createBlogComment(@Body() createBlogCommentDto: any) {
    return this.blogsService.createBlogComment(createBlogCommentDto);
  }

  @Get('comments')
  findAllBlogComments() {
    return this.blogsService.findAllBlogComments();
  }

  @Get('comments/:id')
  findOneBlogComment(@Param('id') id: string) {
    return this.blogsService.findOneBlogComment(id);
  }

  @Patch('comments/:id')
  updateBlogComment(
    @Param('id') id: string,
    @Body() updateBlogCommentDto: any
  ) {
    return this.blogsService.updateBlogComment(id, updateBlogCommentDto);
  }

  @Delete('comments/:id')
  removeBlogComment(@Param('id') id: string) {
    return this.blogsService.removeBlogComment(id);
  }
}
