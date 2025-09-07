import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto } from '@modules/users/dtos/user.dto';
import { Users } from '@entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * Retrieve all users
   * @returns List of all users
   */
  async getAllUsers(): Promise<Users[]> {
    return this.usersRepository.findAll();
  }

  /**
   * Find a user by ID
   * @param id ID of the user
   * @returns User
   * @throws NotFoundException if the user does not exist
   */
  async getUserById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Create a new user
   * @param createUserDto Data to create the user
   * @returns Created user
   */
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    return this.usersRepository.create(createUserDto);
  }

  /**
   * Update a user
   * @param updateUserDto Data to update the user
   * @returns Updated user
   * @throws NotFoundException if the user does not exist
   */
  async updateUser(updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.usersRepository.update(updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${updateUserDto.id} not found`);
    }
    return user;
  }

  /**
   * Delete a user
   * @param id ID of the user to delete
   * @throws NotFoundException if the user does not exist
   */
  async deleteUser(id: string): Promise<void> {
    const deleted = await this.usersRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
