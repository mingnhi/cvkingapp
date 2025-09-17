// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CompanyRepository } from './company.repository';
// import { Company } from '@entities/company.entity';
// import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';

// @Injectable()
// export class CompanyService {
//     constructor(private readonly companyRepo: CompanyRepository) { }

//     async findAll(): Promise<Company[]> {
//         return this.companyRepo.findAll();
//     }

//     async findById(id: string): Promise<Company> {
//         const company = await this.companyRepo.findOne(id);
//         if (!company) {
//             throw new NotFoundException(`Company with ID ${id} not found`);
//         }
//         return company;
//     }

//     async create(dto: CreateCompanyDto): Promise<Company> {
//         return this.companyRepo.create(dto);
//     }

//     async update(id: string, dto: UpdateCompanyDto): Promise<Company> {
//         const company = await this.companyRepo.update(id, dto);
//         if (!company) {
//             throw new NotFoundException(`Company with ID ${id} not found`);
//         }
//         return company;
//     }

//     async remove(id: string): Promise<void> {
//         const deleted = await this.companyRepo.delete(id);
//         if (!deleted) {
//             throw new NotFoundException(`Company with ID ${id} not found`);
//         }
//     }
// }
