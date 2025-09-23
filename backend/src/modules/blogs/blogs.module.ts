import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BlogPosts } from '../../entities/blog-post.entity';
import { BlogTags } from '../../entities/blog-tag.entity';
import { BlogPostTags } from '../../entities/blog-post-tag.entity';
import { BlogComments } from '../../entities/blog-comment.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogsRepository } from './blogs.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      BlogPosts,
      BlogTags,
      BlogPostTags,
      BlogComments,
    ]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsRepository],
  exports: [BlogsService],
})
export class BlogsModule {}
