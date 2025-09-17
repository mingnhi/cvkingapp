import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { JobsRepository } from './jobs.repository';
import { Job } from '../../entities/job.entity';
import { CreateJobDto } from './dtos/create-job.dto';

describe('JobsService', () => {
  let service: JobsService;
  let jobsRepository: JobsRepository;

  const mockJob = {
    id: '1',
    CompanyId: '1',
    PostedByUserId: '1',
    Title: 'Test Job',
    Slug: 'test-job',
    ShortDescription: 'Short desc',
    Description: 'Test job description',
    Location: 'Hanoi',
    Status: 'Active',
    ViewsCount: 0,
    PostedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Job;

  const mockJobsRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };

  const mockCreateJobDto: CreateJobDto = {
    title: 'Software Developer',
    shortDescription: 'Dev job',
    description: 'Great job opportunity',
    location: 'Hanoi',
    companyId: '0'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: JobsRepository,
          useValue: mockJobsRepository,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    jobsRepository = module.get(JobsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return array of jobs', async () => {
      const mockJobs = [mockJob];
      mockJobsRepository.findAll.mockResolvedValue(mockJobs);

      const result = await service.findAll();

      expect(result).toEqual(mockJobs);
      expect(mockJobsRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a job by id', async () => {
      mockJobsRepository.findOne.mockResolvedValue(mockJob);

      const result = await service.findOne('1');

      expect(result).toEqual(mockJob);
      expect(mockJobsRepository.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a new job', async () => {
      mockJobsRepository.create.mockResolvedValue(mockJob);

      const result = await service.create(mockCreateJobDto);

      expect(result).toEqual(mockJob);
      expect(mockJobsRepository.create).toHaveBeenCalledWith(mockCreateJobDto);
    });
  });

  describe('update', () => {
    it('should update a job', async () => {
      const updateData = { title: 'Updated Title' };
      mockJobsRepository.update.mockResolvedValue(mockJob);

      const result = await service.update(updateData);

      expect(result).toEqual(mockJob);
      expect(mockJobsRepository.update).toHaveBeenCalledWith(updateData);
    });
  });

  describe('delete', () => {
    it('should delete a job', async () => {
      mockJobsRepository.delete.mockResolvedValue(true);

      const result = await service.delete('1');

      expect(result).toBe(true);
      expect(mockJobsRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});
