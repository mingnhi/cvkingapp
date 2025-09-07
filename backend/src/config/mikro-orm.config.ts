import { Options, defineConfig } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { MsSqlDriver } from '@mikro-orm/mssql';
import * as dotenv from 'dotenv';

dotenv.config();

export const mikroOrmConfig = (configService: ConfigService): Options => ({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: MsSqlDriver,
  dbName: configService.get<string>('DB_NAME'),
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT'), 10) || 1433,
  user: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/databases/migrations',
  },
});
// Cấu hình tĩnh cho CLI
export default defineConfig({
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  driver: MsSqlDriver,
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/databases/migrations',
  },
});
