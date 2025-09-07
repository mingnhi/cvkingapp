import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsString()
  roleId: string;
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}

export class UpdateUserRoleDto {
  @ApiProperty()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  userId: string;
  @ApiProperty()
  @IsString()
  roleId: string;
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
