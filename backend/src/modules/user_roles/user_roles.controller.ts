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
  async findAll(): Promise<ApiResponse<UserRole[]>> {
    const userRoles = await this.userRoleService.getAllUserRoles();
    return {
      status: 'success',
      message: 'Successfully retrieved all userUserRole',
      data: userRoles,
      meta: { count: userRoles.length },
    };
  }

  /**
   * Find a userRole by ID
   * @param id ID of the userRole
   * @returns Role wrapped in ApiResponse
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<UserRole>> {
    const userRole = await this.userRoleService.getUserRoleById(id);
    return {
      status: 'success',
      message: `Successfully retrieved userRole with ID ${id}`,
      data: userRole,
    };
  }

  /**
   * Create a new userRole
   * @param CreateUserRoleDto Data to create the userRole
   * @returns Created userRole wrapped in ApiResponse
   */
  @Post()
  async create(
    @Body(ValidationPipe) createUserRoleDto: CreateUserRoleDto
  ): Promise<ApiResponse<UserRole>> {
    const userRole =
      await this.userRoleService.createUserRole(createUserRoleDto);
    return {
      status: 'success',
      message: 'Role created successfully',
      data: userRole,
    };
  }

  /**
   * Update a userRole
   * @param UpdateUserRoleDto Data to update the userRole
   * @returns Updated userRole wrapped in ApiResponse
   */
  @Put()
  async update(
    @Body(ValidationPipe) updateUserRoleDto: UpdateUserRoleDto
  ): Promise<ApiResponse<UserRole>> {
    const userRole =
      await this.userRoleService.updateUserRole(updateUserRoleDto);
    return {
      status: 'success',
      message: `Role with ID ${updateUserRoleDto.id} updated successfully`,
      data: userRole,
    };
  }

  /**
   * Delete a userRole
   * @param id ID of the userRole to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.userRoleService.deleteUserRole(id);
    return {
      status: 'success',
      message: `Role with ID ${id} deleted successfully`,
      data: null,
    };
  }
}
