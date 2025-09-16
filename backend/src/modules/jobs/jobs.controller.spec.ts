import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Job, JobStatus } from '../../entities/job.entity';
import { CreateJobDto } from './dtos/create-job.dto';
import { JobQueryDto } from './dtos/job-query.dto';

describe('JobsController', () => {
  let controller: JobsController;
  let service: JobsService;

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@test.com'
  } as any;

  const mockCompany = {
    CompanyId: '1',
    name: 'Test Company'
  };

  const mockJob = {
    JobId: 1,
    Title: 'Test Job',
    Slug: 'test-job',
    Status: JobStatus.ACTIVE,
    CompanyId: 1,
    PostedByUserId: 1,
    PostedAt: new Date(),
    CreatedAt: new Date(),
    ViewsCount: 0,
    company: mockCompany,
    skills: [],
    tags: []
  } as unknown as Job;

  const mockJobsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findPopular: jest.fn(),
    findRecent: jest.fn(),
    findByCompany: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getJobStats: jest.fn()
  };

  beforeEach(async () => {
    const mockAuthGuard = {
      canActivate: jest.fn((context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        req.user = mockUser;
        return true;
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: mockJobsService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<JobsController>(JobsController);
    service = module.get<JobsService>(JobsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new job', async () => {
      const createJobDto: CreateJobDto = {
        companyId: 1,
        title: 'Software Developer',
        slug: 'software-developer',
        description: 'Great job opportunity'
      };

      const mockRequest = { user: mockUser };
      const expectedResponse = {
        status: 'success',
        message: 'Job created successfully',
        data: mockJob,
      };

      mockJobsService.create.mockResolvedValue(mockJob);

      const result = await controller.create(createJobDto, mockRequest as any);

      expect(mockJobsService.create).toHaveBeenCalledWith(createJobDto, mockUser);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findAll', () => {
    it('should return a list of jobs', async () => {
      const query: JobQueryDto = { page: 1, limit: 10 };
      const mockResult = {
        jobs: [mockJob],
        total: 1,
      };
      const expectedResponse = {
        status: 'success',
        message: 'Successfully retrieved jobs',
        data: mockResult,
        meta: {
          count: 1,
          page: 1,
          limit: 10,
        },
      };

      mockJobsService.findAll.mockResolvedValue(mockResult);

      const result = await controller.findAll(query);

      expect(mockJobsService.findAll).toHaveBeenCalledWith(query);
      expect(result).toEqual(expectedResponse);
    });

    it('should use default page and limit if not provided', async () => {
      const query: JobQueryDto = {};
      const mockResult = {
        jobs: [mockJob],
        total: 1,
      };

      mockJobsService.findAll.mockResolvedValue(mockResult);

      await controller.findAll(query);

      expect(mockJobsService.findAll).toHaveBeenCalledWith({
        ...query,
        page: 1,
        limit: 10,
      });
    });
  });

  describe('findPopular', () => {
    it('should return popular jobs', async () => {
      const mockJobs = [mockJob];
      const expectedResponse = {
        status: 'success',
        message: 'Successfully retrieved popular jobs',
        data: mockJobs,
        meta: { count: mockJobs.length },
      };

      mockJobsService.findPopular.mockResolvedValue(mockJobs);

      const result = await controller.findPopular(5);

      expect(mockJobsService.findPopular).toHaveBeenCalledWith(5);
      expect(result).toEqual(expectedResponse);
    });

    it('should handle undefined limit', async () => {
      const mockJobs = [mockJob];
      mockJobsService.findPopular.mockResolvedValue(mockJobs);

      await controller.findPopular(undefined);

      expect(mockJobsService.findPopular).toHaveBeenCalledWith(undefined);
    });
  });

  describe('findRecent', () => {
    it('should return recent jobs', async () => {
      const mockJobs = [mockJob];
      const expectedResponse = {
        status: 'success',
        message: 'Successfully retrieved recent jobs',
        data: mockJobs,
        meta: { count: mockJobs.length },
      };

      mockJobsService.findRecent.mockResolvedValue(mockJobs);

      const result = await controller.findRecent(10);

      expect(mockJobsService.findRecent).toHaveBeenCalledWith(10);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findByCompany', () => {
    it('should return jobs by company', async () => {
      const companyId = '1';
      const query: JobQueryDto = { page: 1, limit: 10 };
      const mockResult = {
        jobs: [mockJob],
        total: 1,
      };
      const expectedResponse = {
        status: 'success',
        message: 'Successfully retrieved company jobs',
        data: mockResult,
        meta: {
          count: 1,
          page: 1,
          limit: 10,
        },
      };

      mockJobsService.findByCompany.mockResolvedValue(mockResult);

      const result = await controller.findByCompany(companyId, query);

      expect(mockJobsService.findByCompany).toHaveBeenCalledWith(companyId, query);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('findOne', () => {
    it('should return a job by id', async () => {
      const jobId = 1;
      const mockRequest = { user: mockUser, sessionId: 'session-123' };
      const expectedResponse = {
        status: 'success',
        message: 'Successfully retrieved job',
        data: mockJob,
      };

      mockJobsService.findOne.mockResolvedValue(mockJob);

      const result = await controller.findOne(jobId, mockRequest as any);

      expect(mockJobsService.findOne).toHaveBeenCalledWith(jobId, mockUser, 'session-123');
      expect(result).toEqual(expectedResponse);
    });

    it('should throw NotFoundException if job not found', async () => {
      const jobId = 999;
      mockJobsService.findOne.mockResolvedValue(null);

      await expect(controller.findOne(jobId, { user: mockUser } as any)).rejects.toThrow('Job not found');
    });

    it('should handle undefined user', async () => {
      const jobId = 1;
      const mockRequest = { user: undefined, sessionId: undefined };
      mockJobsService.findOne.mockResolvedValue(mockJob);

      const result = await controller.findOne(jobId, mockRequest as any);

      expect(mockJobsService.findOne).toHaveBeenCalledWith(jobId, undefined, undefined);
    });
  });

  describe('update', () => {
    it('should update a job', async () => {
      const jobId = 1;
      const updateJobDto: Partial<CreateJobDto> = {
        title: 'Updated Job Title',
        description: 'Updated description'
      };
      const mockRequest = { user: mockUser };
      const expectedResponse = {
        status: 'success',
        message: 'Job updated successfully',
        data: mockJob,
      };

      mockJobsService.update.mockResolvedValue(mockJob);

      const result = await controller.update(jobId, updateJobDto, mockRequest as any);

      expect(mockJobsService.update).toHaveBeenCalledWith(jobId, updateJobDto, mockUser);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('remove', () => {
    it('should delete a job', async () => {
      const jobId = 1;
      const mockRequest = { user: mockUser };
      const expectedResponse = {
        status: 'success',
        message: 'Job deleted successfully',
        data: null,
      };

      mockJobsService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(jobId, mockRequest as any);

      expect(mockJobsService.remove).toHaveBeenCalledWith(jobId, mockUser);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getStats', () => {
    it('should return job statistics', async () => {
      const jobId = 1;
      const mockRequest = { user: mockUser };
      const mockStats = {
        viewsCount: 100,
        totalViews: 100,
        recentViews: []
      };
      const expectedResponse = {
        status: 'success',
        message: 'Successfully retrieved job stats',
        data: mockStats,
      };

      mockJobsService.getJobStats.mockResolvedValue(mockStats);

      const result = await controller.getStats(jobId, mockRequest as any);

      expect(mockJobsService.getJobStats).toHaveBeenCalledWith(jobId, mockUser);
      expect(result).toEqual(expectedResponse);
    });
  });
});
