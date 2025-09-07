import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { mikroOrmConfig } from '@config/mikro-orm.config';
import { UsersModule } from '@modules/users/users.module';
import { RolesModule } from '@modules/roles/roles.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserRolesModule } from './modules/user_roles/user_roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        mikroOrmConfig(configService),
      inject: [ConfigService],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    UserRolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
