// import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
// import { CompanyService } from './company.service';
// import { CreateCompanyDto } from './dto/create-company.dto';
// import { UpdateCompanyDto } from './dto/update-company.dto';

// @Controller('companies')
// export class CompanyController {
//     constructor(private readonly companyService: CompanyService) { }

//     /**
//      * Create a new company
//      */
//     @Post()
//     async create(@Body() dto: CreateCompanyDto) {
//         return this.companyService.create(dto);
//     }

//     /**
//      * Retrieve all companies
//      */
//     @Get()
//     async findAll() {
//         return this.companyService.findAll();
//     }

//     /**
//      * Get company by ID
//      */
//     @Get(':id')
//     async findById(@Param('id') id: string) {
//         return this.companyService.findById(id);
//     }

//     /**
//      * Update company by ID
//      */
//     @Put(':id')
//     async update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
//         return this.companyService.update(id, dto);
//     }

//     /**
//      * Delete company by ID
//      */
//     @Delete(':id')
//     async remove(@Param('id') id: string) {
//         return this.companyService.remove(id);
//     }
// }
