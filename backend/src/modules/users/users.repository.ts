import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Users } from '@entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dtos/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: EntityRepository<Users>,
    private readonly em: EntityManager
  ) {}

  /**
   * Retrieve all users
   * @returns List of all users
   */
  async findAll(): Promise<Users[]> {
    return this.userRepository.findAll();
  }

  /**
   * Find a user by ID
   * @param id ID of the user
   * @returns user or null if not found
   */
  async findOne(id: string): Promise<Users | null> {
    return this.userRepository.findOne({ id });
  }

  /**
   * Create a new user
   * // UUID will be automatically generated in AuditableEntity
   * @param createuserDto Data to create the user
   * @returns Created user
   */
  async create(createuserDto: CreateUserDto): Promise<Users> {
    const user = this.userRepository.create({
      ...createuserDto,
      id: undefined,
    });
    await this.em.persistAndFlush(user);
    return user;
  }

  /**
   * Update a user
   * @param updateuserDto Data to update the user
   * @returns Updated user or null if not found
   */
  async update(updateuserDto: UpdateUserDto): Promise<Users | null> {
    const user = await this.userRepository.findOne({ id: updateuserDto.id });
    if (!user) {
      return null;
    }
    user.email = updateuserDto.email;
    user.password = updateuserDto.password;
    user.isActive = updateuserDto.isActive;
    user.isVerify = updateuserDto.isVerify;
    await this.em.flush();
    return user;
  }

  /**
   * Delete a user
   * @param id ID of the user to delete
   * @returns True if deletion is successful, false if not found
   */
  async delete(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      return false;
    }
    await this.em.removeAndFlush(user);
    return true;
  }
}
