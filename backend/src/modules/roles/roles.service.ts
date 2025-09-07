import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';
import { Roles } from '@entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  /**
   * Retrieve all roles
   * @returns List of all roles
   */
  async getAllRoles(): Promise<Roles[]> {
    return this.rolesRepository.findAll();
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role
   * @throws NotFoundException if the role does not exist
   */
  async getRoleById(id: string): Promise<Roles> {
    const role = await this.rolesRepository.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  /**
   * Create a new role
   * @param createRoleDto Data to create the role
   * @returns Created role
   */
  async createRole(createRoleDto: CreateRoleDto): Promise<Roles> {
    return this.rolesRepository.create(createRoleDto);
  }

  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role
   * @throws NotFoundException if the role does not exist
   */
  async updateRole(updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const role = await this.rolesRepository.update(updateRoleDto);
    if (!role) {
      throw new NotFoundException(`Role with ID ${updateRoleDto.id} not found`);
    }
    return role;
  }

  /**
   * Delete a role
   * @param id ID of the role to delete
   * @throws NotFoundException if the role does not exist
   */
  async deleteRole(id: string): Promise<void> {
    const deleted = await this.rolesRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }
}
