import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { EmployerProfile } from '@entities/employer-profile.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { EmployerProfilesRepository } from './employer-profiles.repository';
import {
  CreateEmployerProfileDto,
  UpdateEmployerProfileDto,
} from './dtos/employer-profile.dto';

@ApiTags('employer-profiles')
@Controller('employer-profiles')
export class EmployerProfilesController {
  constructor(private readonly repo: EmployerProfilesRepository) {}

  @Get()
  async findAll(): Promise<ApiResponse<EmployerProfile[]>> {
    const data = await this.repo.findAll();
    return {
      status: 'success',
      message: 'All employer profiles',
      data,
      meta: { count: data.length },
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<EmployerProfile>> {
    const data = await this.repo.findOne(id);
    return { status: 'success', message: 'Employer profile found', data };
  }

  @Post()
  async create(
    @Body(ValidationPipe) dto: CreateEmployerProfileDto
  ): Promise<ApiResponse<EmployerProfile>> {
    const data = await this.repo.create(dto);
    return { status: 'success', message: 'Employer profile created', data };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) dto: UpdateEmployerProfileDto
  ): Promise<ApiResponse<EmployerProfile>> {
    const data = await this.repo.update(id, dto);
    return { status: 'success', message: 'Employer profile updated', data };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<null>> {
    await this.repo.remove(id);
    return {
      status: 'success',
      message: 'Employer profile deleted',
      data: null,
    };
  }
}
