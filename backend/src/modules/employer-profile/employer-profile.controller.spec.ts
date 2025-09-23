import { Test, TestingModule } from '@nestjs/testing';
import { EmployerProfileController } from './employer-profile.controller';

describe('EmployerProfileController', () => {
  let controller: EmployerProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployerProfileController],
    }).compile();

    controller = module.get<EmployerProfileController>(EmployerProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
