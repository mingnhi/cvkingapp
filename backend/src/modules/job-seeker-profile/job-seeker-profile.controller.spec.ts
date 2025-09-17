import { Test, TestingModule } from '@nestjs/testing';
import { JobSeekerProfileController } from './job-seeker-profile.controller';

describe('JobSeekerProfileController', () => {
  let controller: JobSeekerProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobSeekerProfileController],
    }).compile();

    controller = module.get<JobSeekerProfileController>(JobSeekerProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
