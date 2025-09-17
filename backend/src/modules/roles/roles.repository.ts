import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
// import { Roles } from '@entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '@modules/roles/dtos/role.dto';

@Injectable()
export class RolesRepository {
  constructor(
    // @InjectRepository(Roles)
    // private readonly roleRepository: EntityRepository<Roles>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all roles
   * @returns List of all roles
   */
  async findAll(): Promise<any> {
    const results = await this.em.getConnection().execute('EXEC SP_GetAllRole');
    return results ?? [];
  }

  /**
   * Find a role by ID
   * @param id ID of the role
   * @returns Role or null if not found
   */
  async findOne(id: string): Promise<any | null> {
    const result = await this.em
      .getConnection()
      .execute('EXEC SP_GetRoleById ?', [id]);
    const role = result?.[0] ?? result;
    return role ?? null;
  }

  /**
   * Create a new role
   * // UUID will be automatically generated in AuditableEntity
   * @param createRoleDto Data to create the role
   * @returns Created role
   */
  async create(createRoleDto: CreateRoleDto): Promise<any> {
    const result = this.em
      .getConnection()
      .execute('EXEC SP_InsertRole ?, ?', [
        createRoleDto.name,
        createRoleDto.description,
      ]);

    const newRole = result?.[0] ?? result;
    return newRole as any;
  }

  /**
   * Update a role
   * @param updateRoleDto Data to update the role
   * @returns Updated role or null if not found
   */
  async update(updateRoleDto: UpdateRoleDto): Promise<any | null> {
    await this.em
      .getConnection()
      .execute('EXEC SP_UpdateRole ?, ?, ?', [
        updateRoleDto.id,
        updateRoleDto.name,
        updateRoleDto.description,
      ]);
    return this.findOne(updateRoleDto.id);
  }

  /**
   * Delete a role
   * @param id ID of the role to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    await this.em.getConnection().execute('EXEC SP_DeleteRole ?', [id]);
    return true;
  }
}
