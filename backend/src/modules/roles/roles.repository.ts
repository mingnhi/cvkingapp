import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Roles } from '@entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Roles)
    private readonly roleRepository: EntityRepository<Roles>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all roles
   * @returns List of all roles
   */
  async findAll(): Promise<Roles[]> {
    return this.roleRepository.findAll();
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role or null if not found
   */
  async findOne(id: string): Promise<Roles | null> {
    return this.roleRepository.findOne({ id });
  }

  /**
   * Create a new role
   * // UUID will be automatically generated in AuditableEntity
   * @param createRoleDto Data to create the role
   * @returns Created role
   */
  async create(createRoleDto: CreateRoleDto): Promise<Roles> {
    const role = this.roleRepository.create({
      ...createRoleDto,
      id: undefined,
    });
    await this.em.persistAndFlush(role);
    return role;
  }

  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role or null if not found
   */
  async update(updateRoleDto: UpdateRoleDto): Promise<Roles | null> {
    const role = await this.roleRepository.findOne({ id: updateRoleDto.id });
    if (!role) {
      return null;
    }
    role.name = updateRoleDto.name;
    role.description = updateRoleDto.description;
    await this.em.flush();
    return role;
  }

  /**
   * Delete a role
   * @param id ID of the role to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const role = await this.roleRepository.findOne({ id });
    if (!role) {
      return false;
    }
    await this.em.removeAndFlush(role);
    return true;
  }
}
