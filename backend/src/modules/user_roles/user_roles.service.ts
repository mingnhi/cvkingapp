import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRolesRepository } from './user_roles.repository';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '@modules/user_roles/dtos/user_role.dto';
import { UserRole } from '@entities/user_role.entity';

@Injectable()
export class UserRolesService {
  constructor(private readonly userRolesRepository: UserRolesRepository) {}

  /**
   * Retrieve all userRoles
   * @returns List of all userRoles
   */
  async getAllUserRoles(): Promise<UserRole[]> {
    return this.userRolesRepository.findAll();
  }

  /**
   * Find a userRole by ID
   * @param id ID of the userRole
   * @returns UserRole
   * @throws NotFoundException if the userRole does not exist
   */
  async getUserRoleById(id: string): Promise<UserRole> {
    const userRole = await this.userRolesRepository.findOne(id);
    if (!userRole) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
    return userRole;
  }

  /**
   * Create a new userRole
   * @param createUserRoleDto Data to create the userRole
   * @returns Created userRole
   */
  async createUserRole(
    createUserRoleDto: CreateUserRoleDto
  ): Promise<UserRole> {
    return this.userRolesRepository.create(createUserRoleDto);
  }

  /**
   * Update a userRole
   * @param updateUserRoleDto Data to update the userRole
   * @returns Updated userRole
   * @throws NotFoundException if the userRole does not exist
   */
  async updateUserRole(
    updateUserRoleDto: UpdateUserRoleDto
  ): Promise<UserRole> {
    const userRole = await this.userRolesRepository.update(updateUserRoleDto);
    if (!userRole) {
      throw new NotFoundException(
        `UserRole with ID ${updateUserRoleDto.id} not found`
      );
    }
    return userRole;
  }

  /**
   * Delete a userRole
   * @param id ID of the userRole to delete
   * @throws NotFoundException if the userRole does not exist
   */
  async deleteUserRole(id: string): Promise<void> {
    const deleted = await this.userRolesRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
  }
}
