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
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';
import { Roles } from '@entities/role.entity';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * Retrieve all roles
   * @returns List of all roles wrapped in ApiResponse
   */
  @Get()
  async findAll(): Promise<ApiResponse<Roles[]>> {
    const roles = await this.rolesService.getAllRoles();
    return {
      status: 'success',
      message: 'Successfully retrieved all roles',
      data: roles,
      meta: { count: roles.length },
    };
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role wrapped in ApiResponse
   */
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<Roles>> {
    const role = await this.rolesService.getRoleById(id);
    return {
      status: 'success',
      message: `Successfully retrieved role with ID ${id}`,
      data: role,
    };
  }

  /**
   * Create a new role
   * @param createRoleDto Data to create the role
   * @returns Created role wrapped in ApiResponse
   */
  @Post()
  async create(
    @Body(ValidationPipe) createRoleDto: CreateRoleDto
  ): Promise<ApiResponse<Roles>> {
    const role = await this.rolesService.createRole(createRoleDto);
    return {
      status: 'success',
      message: 'Role created successfully',
      data: role,
    };
  }

  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role wrapped in ApiResponse
   */
  @Put()
  async update(
    @Body(ValidationPipe) updateRoleDto: UpdateRoleDto
  ): Promise<ApiResponse<Roles>> {
    const role = await this.rolesService.updateRole(updateRoleDto);
    return {
      status: 'success',
      message: `Role with ID ${updateRoleDto.id} updated successfully`,
      data: role,
    };
  }

  /**
   * Delete a role
   * @param id ID of the role to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  async delete(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.rolesService.deleteRole(id);
    return {
      status: 'success',
      message: `Role with ID ${id} deleted successfully`,
      data: null,
    };
  }
}
