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
  ParseIntPipe,
} from '@nestjs/common';
import { UserRolesService } from './user_roles.service';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '@modules/user_roles/dtos/user_role.dto';
import { UserRole } from '@entities/user_role.entity';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('UserRole')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRolesService) {}

  /**
   * Retrieve all userUserRole
   * @returns List of all userUserRole wrapped in ApiResponse
   */
  @Get()
  findAll(): Promise<UserRole[]> {
    return this.userRoleService.getAllUserRoles();
  }

  /**
   * Find a userRole by ID
   * @param id ID of the userRole
   * @returns Role wrapped in ApiResponse
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserRole> {
    return this.userRoleService.getUserRoleById(id);
  }

  /**
   * Create a new userRole
   * @param CreateUserRoleDto Data to create the userRole
   * @returns Created userRole wrapped in ApiResponse
   */
  @Post()
  create(@Body() dto: CreateUserRoleDto): Promise<UserRole> {
    return this.userRoleService.createUserRole(dto);
  }

  /**
   * Update a userRole
   * @param UpdateUserRoleDto Data to update the userRole
   * @returns Updated userRole wrapped in ApiResponse
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserRoleDto,
  ): Promise<UserRole> {
    return this.userRoleService.update(id, dto);
  }

  /**
   * Delete a userRole
   * @param id ID of the userRole to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.userRoleService.deleteUserRole(id);
  }
}
