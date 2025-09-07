import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserRole } from '@entities/user_role.entity';
import {
  CreateUserRoleDto,
  UpdateUserRoleDto,
} from '@modules/user_roles/dtos/user_role.dto';

@Injectable()
export class UserRolesRepository {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: EntityRepository<UserRole>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all userRoles
   * @returns List of all userRoles
   */
  async findAll(): Promise<UserRole[]> {
    return this.userRoleRepository.findAll();
  }

  /**
   * Find a userRole by ID
   * @param id ID of the userRole
   * @returns UserRole or null if not found
   */
  async findOne(id: string): Promise<UserRole | null> {
    return this.userRoleRepository.findOne({ id });
  }

  /**
   * Create a new userRole
   * // UUID will be automatically generated in AuditableEntity
   * @param createUserRoleDto Data to create the userRole
   * @returns Created userRole
   */
  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRole> {
    const userRole = this.userRoleRepository.create({
      ...createUserRoleDto,
      id: undefined,
    });
    await this.em.persistAndFlush(userRole);
    return userRole;
  }

  /**
   * Update a userRole
   * @param updateUserRoleDto Data to update the userRole
   * @returns Updated userRole or null if not found
   */
  async update(updateUserRoleDto: UpdateUserRoleDto): Promise<UserRole | null> {
    const userRole = await this.userRoleRepository.findOne({
      id: updateUserRoleDto.id,
    });
    if (!userRole) {
      return null;
    }
    userRole.userId = updateUserRoleDto.userId;
    userRole.roleId = updateUserRoleDto.roleId;
    userRole.isActive = updateUserRoleDto.isActive;
    await this.em.flush();
    return userRole;
  }

  /**
   * Delete a userRole
   * @param id ID of the userRole to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const userRole = await this.userRoleRepository.findOne({ id });
    if (!userRole) {
      return false;
    }
    await this.em.removeAndFlush(userRole);
    return true;
  }
}
