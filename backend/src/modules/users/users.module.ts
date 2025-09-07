import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Users } from '../../entities/user.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [MikroOrmModule.forFeature([Users])],
  providers: [UsersRepository, UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
