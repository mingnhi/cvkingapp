import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BlogPosts } from '../../entities/blog-post.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { BlogsRepository } from './blogs.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      BlogPosts,
    ]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService, BlogsRepository],
  exports: [BlogsService],
})
export class BlogsModule {}
