import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @IsInt()
  userId: number;

  @IsInt()
  roleId: number;
}

export class UpdateUserRoleDto extends CreateUserRoleDto { 
  @IsInt()
  userRoleId: number

}
