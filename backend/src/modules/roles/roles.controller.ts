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
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';
import { Roles } from '@entities/role.entity';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  /**
   * Retrieve all roles
   * @returns List of all roles wrapped in ApiResponse
   */
  @Get()
  findAll(): Promise<Roles[]> {
    return this.rolesService.getAllRoles();
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role wrapped in ApiResponse
   */
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Roles> {
    return this.rolesService.findOne(id);
  }

  @Get('name/:roleName')
  async getRoleByName(
    @Param('roleName') roleName: string,
  ): Promise<Roles> {
    // Gọi service
    return this.rolesService.findByName(roleName);
  }

  /**
   * Create a new role
   * @param createRoleDto Data to create the role
   * @returns Created role wrapped in ApiResponse
   */
  @Post()
  create(@Body() dto: CreateRoleDto): Promise<Roles> {
    return this.rolesService.createRole(dto);
  }
  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role wrapped in ApiResponse
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ): Promise<Roles> {
    return this.rolesService.updateRole(id, dto);
  }

  /**
   * Delete a role
   * @param id ID of the role to delete
   * @returns Success message wrapped in ApiResponse
   */
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.rolesService.deleteRole(id);
  }
}
