import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
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
  findOne(id: number): Promise<UserRole | null> {
    return this.userRoleRepository.findOne({ userRoleId: id }, { populate: ['user', 'role'] });
  }

  findByUser(userId: number): Promise<UserRole[]> {
    return this.userRoleRepository.find(
      { user: { userId } },
      { populate: ['role'] });
  }
  /**
   * Create a new userRole
   * // UUID will be automatically generated in AuditableEntity
   * @param createUserRoleDto Data to create the userRole
   * @returns Created userRole
   */
  async create(dto: CreateUserRoleDto): Promise<UserRole> {
    const userRole = this.userRoleRepository.create({
      user: dto.userId,
      role: dto.roleId,
    });
    await this.em.persistAndFlush(userRole);
    return userRole;
  }

  /**
   * Update a userRole
   * @param updateUserRoleDto Data to update the userRole
   * @returns Updated userRole or null if not found
   */
  async update(userroleId: number, dto: UpdateUserRoleDto): Promise<UserRole> {
    const userRole = await this.userRoleRepository.findOne(
      { userRoleId: userroleId },
      {populate: ['user', 'role']},
    );
    if (!userRole) throw new NotFoundException('UserRole not found');
    
    if (dto.userId) {
      userRole.user = dto.userId as any;
    }
    if (dto.roleId) {
      userRole.role = dto.roleId as any;
    }

    await this.em.flush();
    return userRole;
  }

  /**
   * Delete a userRole
   * @param id ID of the userRole to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: number): Promise<boolean> {
    const userRole = this.findOne(id);
    if (!userRole) return false;
    await this.em.removeAndFlush(userRole);
    return true;
  }

}
