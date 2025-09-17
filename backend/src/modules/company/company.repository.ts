// import { EntityRepository, EntityManager } from '@mikro-orm/core';
// import { InjectRepository } from '@mikro-orm/nestjs';
// import { Injectable } from '@nestjs/common';
// import { Company } from '@entities/company.entity';
// import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';

// @Injectable()
// export class CompanyRepository {
//     constructor(
//         @InjectRepository(Company)
//         private readonly companyRepo: EntityRepository<Company>,
//         private readonly em: EntityManager,
//     ) { }

//     /**
//      * Retrieve all companies
//      * @returns List of all companies
//      */
//     async findAll(): Promise<Company[]> {
//         return this.companyRepo.findAll();
//     }

//     /**
//      * Find a company by ID
//      * @param id ID of the company
//      * @returns Company or null if not found
//      */
//     async findOne(id: string): Promise<Company | null> {
//         return this.companyRepo.findOne({ id });
//     }

//     /**
//      * Create a new company
//      * @param dto Data to create the company
//      * @returns Created company
//      */
//     async create(dto: CreateCompanyDto): Promise<Company> {
//         const company = this.companyRepo.create({
//             ...dto,
//             id: undefined, // identity column -> auto
//         });
//         await this.em.persistAndFlush(company);
//         return company;
//     }

//     /**
//      * Update a company
//      * @param dto Data to update the company
//      * @returns Updated company or null if not found
//      */
//     async update(id: string, dto: UpdateCompanyDto): Promise<Company | null> {
//         const company = await this.companyRepo.findOne({ id });
//         if (!company) return null;

//         this.companyRepo.assign(company, dto as any);
//         await this.em.flush();
//         return company;
//     }

//     /**
//      * Delete a company
//      * @param id ID of the company to delete
//      * @returns True if deletion is successful, false if not found
//      */
//     async delete(id: string): Promise<boolean> {
//         const company = await this.companyRepo.findOne({ id });
//         if (!company) return false;

//         await this.em.removeAndFlush(company);
//         return true;
//     }
// }
