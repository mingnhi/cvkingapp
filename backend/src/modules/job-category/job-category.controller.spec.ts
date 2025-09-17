import { Test, TestingModule } from '@nestjs/testing';
import { JobCategoryController } from './job-category.controller';

describe('JobCategoryController', () => {
  let controller: JobCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobCategoryController],
    }).compile();

    controller = module.get<JobCategoryController>(JobCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
