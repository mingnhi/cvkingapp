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
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';
// import { Roles } from '@entities/role.entity';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { ApiTags } from '@nestjs/swagger';
import { RolesRepository } from './roles.repository';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
<<<<<<< HEAD
  constructor(
    // private readonly rolesService: RolesService
    private readonly rolesRepository: RolesRepository
  ) {}
=======
  constructor(private readonly rolesService: RolesService) { }
>>>>>>> feat/minhnhi/login-BE

  /**
   * Retrieve all roles
   * @returns List of all roles wrapped in ApiResponse
   */
  @Get()
<<<<<<< HEAD
  async findAll(): Promise<ApiResponse<any>> {
    const roles = await this.rolesRepository.findAll();
    return {
      status: 'success',
      message: 'Successfully retrieved all roles',
      data: roles,
      meta: { count: roles.length },
    };
=======
  findAll(): Promise<Roles[]> {
    return this.rolesService.getAllRoles();
>>>>>>> feat/minhnhi/login-BE
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role wrapped in ApiResponse
   */
  @Get(':id')
<<<<<<< HEAD
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<any>> {
    const role = await this.rolesRepository.findOne(id);
    return {
      status: 'success',
      message: `Successfully retrieved role with ID ${id}`,
      data: role,
    };
=======
  getOne(@Param('id', ParseIntPipe) id: string): Promise<Roles> {
    return this.rolesService.findOne(id);
  }

  @Get('name/:roleName')
  async getRoleByName(
    @Param('roleName') roleName: string,
  ): Promise<Roles> {
    // Gọi service
    return this.rolesService.findByName(roleName);
>>>>>>> feat/minhnhi/login-BE
  }

  /**
   * Create a new role
   * @param createRoleDto Data to create the role
   * @returns Created role wrapped in ApiResponse
   */
  @Post()
<<<<<<< HEAD
  async create(
    @Body(ValidationPipe) createRoleDto: CreateRoleDto
  ): Promise<ApiResponse<any>> {
    const role = await this.rolesRepository.create(createRoleDto);
    return {
      status: 'success',
      message: 'Role created successfully',
      data: role,
    };
=======
  create(@Body() dto: CreateRoleDto): Promise<Roles> {
    return this.rolesService.createRole(dto);
>>>>>>> feat/minhnhi/login-BE
  }
  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role wrapped in ApiResponse
   */
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
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
  remove(@Param('id', ParseIntPipe) id: string): Promise<boolean> {
    return this.rolesService.deleteRole(id);
  }
}
