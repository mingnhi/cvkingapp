import { EntityManager } from '@mikro-orm/core';
import { RolesService } from '@modules/roles/roles.service';
import { UserRolesService } from '@modules/user_roles/user_roles.service';
import { UsersService } from '@modules/users/users.service';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '@modules/users/users.repository';
import { loginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    // private readonly usersrepo: UsersRepository,
    private readonly rolesService: RolesService,
    private readonly usersRoleService: UserRolesService,
    private readonly em: EntityManager,
    private readonly jwt: JwtService
  ) { }
  private async signTokens(userId: number, email: string) {
    const payload = { sub: userId, email };
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET || 'access_secret',
      expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
      expiresIn: process.env.JWT_REFRESH_EXPIRATION_TIME,
    });
    return { accessToken, refreshToken };
  }
  private async setRefreshToken(userId: number, token: string) {
    const hash = await bcrypt.hash(token, 10);
    await this.usersService.update(userId, { refreshToken: hash });
  }

  async validateUser(userId: number) {
    // ví dụ: tìm user theo id
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }

  async register(dto: RegisterDto) {
    const exist = await this.usersService.findByEmail(dto.email);
    if (exist) throw new ConflictException('Email đã tồn tại');

    //mã hoá password
    const hashedPassword = await bcrypt.hash(dto.password, 10);


    const user = await this.usersService.createUser({
      email: dto.email,
      password: hashedPassword
    });

    const jobSeekerRole = await this.rolesService.findByName('JobSeeker');

    await this.usersRoleService.createUserRole({
      userId: user.userId,  
      roleId: jobSeekerRole.RoleId,         
    });

    
    // const role = await this.rolesService.findByName('JobSeeker');
    // if (!role) throw new NotFoundException('Role không tồn tại');
    // await this.usersRoleService.createUserRole({
    //   userId: user.userId,
    //   roleId: role.RoleId,
    // });
    const { accessToken, refreshToken } =
      await this.signTokens(user.userId, user.email);
    await this.setRefreshToken(user.userId, refreshToken);

    return { user, accessToken, refreshToken };
  }

  async login(dto: loginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.password) throw new UnauthorizedException('Sai email hoặc mật khẩu');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Sai email hoặc mật khẩu');

    const { accessToken, refreshToken } =
      await this.signTokens(user.userId, user.email);
    await this.setRefreshToken(user.userId, refreshToken);

    return { user, accessToken, refreshToken };
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user?.refreshToken) throw new UnauthorizedException();

    const match = await bcrypt.compare(refreshToken, user.refreshToken );
    if (!match) throw new UnauthorizedException();

    const { accessToken, refreshToken: newRefresh } =
      await this.signTokens(user.userId, user.email);
    await this.setRefreshToken(user.userId, newRefresh);
    return { accessToken, refreshToken: newRefresh };
  }

  async logout(userId: number) {
    await this.usersService.update(userId, { refreshToken: null });
    return { success: true };
  }
}
