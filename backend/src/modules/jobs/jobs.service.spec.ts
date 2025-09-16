import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager, Collection } from '@mikro-orm/core';
import { JobsService } from './jobs.service';
import { JobsRepository } from './jobs.repository';
import { JobViewsService } from '../job-views/job-views.service';
import { Job, JobStatus } from '../../entities/job.entity';
import { Company } from '../../entities/company.entity';
import { JobCategory } from '../../entities/job-category.entity';
import { Skill } from '../../entities/skill.entity';
import { JobTag } from '../../entities/job-tag.entity';
import { Users } from '../../entities/user.entity';
import { CreateJobDto } from './dtos/create-job.dto';
import { JobQueryDto } from './dtos/job-query.dto';

describe('JobsService', () => {
  let service: JobsService;
  let jobsRepository: JobsRepository;
  let companyRepository: EntityRepository<Company>;
  let jobViewsService: JobViewsService;
  let em: EntityManager;

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com'
  } as unknown as Users;

  const mockCompany = {
    CompanyId: '1',
    name: 'Test Company'
  } as unknown as Company;

  // Create mock collections for the job
  const mockSkillsCollection = {
    add: jest.fn(),
    removeAll: jest.fn(),
    contains: jest.fn(),
    toArray: jest.fn().mockReturnValue([])
  } as unknown as Collection<Skill>;

  const mockTagsCollection = {
    add: jest.fn(),
    removeAll: jest.fn(),
    contains: jest.fn(),
    toArray: jest.fn().mockReturnValue([])
  } as unknown as Collection<JobTag>;

  // Create mock roles collections
  const mockRolesCollection = {
    getItems: jest.fn().mockReturnValue([{ name: 'Employer' }])
  } as unknown as Collection<any>;

  const mockAdminRolesCollection = {
    getItems: jest.fn().mockReturnValue([{ name: 'Admin' }])
  } as unknown as Collection<any>;

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
    skills: mockSkillsCollection,
    tags: mockTagsCollection
  } as unknown as Job;

  const mockJobsRepository = {
    create: jest.fn(),
    persistAndFlush: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    find: jest.fn(),
    removeAndFlush: jest.fn()
  };

  const mockCompanyRepository = {
    findOneOrFail: jest.fn(),
    findOne: jest.fn()
  };

  const mockJobCategoryRepository = {
    findOneOrFail: jest.fn()
  };

  const mockSkillRepository = {
    findOne: jest.fn(),
    create: jest.fn()
  };

  const mockJobTagRepository = {
    findOne: jest.fn(),
    create: jest.fn()
  };

  const mockJobViewsService = {
    trackView: jest.fn(),
    getJobViews: jest.fn()
  };

  const mockEM = {
    findOneOrFail: jest.fn(),
    persistAndFlush: jest.fn(),
    removeAndFlush: jest.fn(),
    findOne: jest.fn()
  };

  const mockCreateJobDto: CreateJobDto = {
    companyId: 1,
    title: 'Software Developer',
    slug: 'software-developer',
    description: 'Great job opportunity',
    skills: ['JavaScript', 'TypeScript'],
    tags: ['Full-time', 'Remote']
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        {
          provide: JobsRepository,
          useValue: mockJobsRepository,
        },
        {
          provide: getRepositoryToken(Company),
          useValue: mockCompanyRepository,
        },
        {
          provide: getRepositoryToken(JobCategory),
          useValue: mockJobCategoryRepository,
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: mockSkillRepository,
        },
        {
          provide: getRepositoryToken(JobTag),
          useValue: mockJobTagRepository,
        },
        {
          provide: JobViewsService,
          useValue: mockJobViewsService,
        },
        {
          provide: EntityManager,
          useValue: mockEM,
        },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
    jobsRepository = module.get(JobsRepository);
    companyRepository = module.get(getRepositoryToken(Company));
    jobViewsService = module.get(JobViewsService);
    em = module.get<EntityManager>(EntityManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new job successfully', async () => {
      mockCompanyRepository.findOneOrFail.mockResolvedValue(mockCompany);
      mockJobsRepository.create.mockReturnValue(mockJob);
      mockJobsRepository.persistAndFlush.mockResolvedValue(undefined);
      mockSkillRepository.findOne.mockResolvedValue(null);
      mockSkillRepository.create.mockReturnValue({ Name: 'JavaScript' });
      mockJobTagRepository.findOne.mockResolvedValue(null);
      mockJobTagRepository.create.mockReturnValue({ Name: 'Full-time' });

      const result = await service.create(mockCreateJobDto, mockUser);

      expect(mockCompanyRepository.findOneOrFail).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockJob);
    });

    it('should create skill if it does not exist', async () => {
      mockCompanyRepository.findOneOrFail.mockResolvedValue(mockCompany);
      mockJobsRepository.create.mockReturnValue(mockJob);
      mockSkillRepository.findOne.mockResolvedValue(null);
      mockSkillRepository.create.mockReturnValue({ Name: 'JavaScript', Id: 1 });

      await service.create(mockCreateJobDto, mockUser);

      expect(mockSkillRepository.create).toHaveBeenCalledWith({ Name: 'JavaScript' });
      expect(mockEM.persistAndFlush).toHaveBeenCalled();
    });

    it('should use existing skill if found', async () => {
      const existingSkill = { Name: 'JavaScript', Id: 1 };
      mockCompanyRepository.findOneOrFail.mockResolvedValue(mockCompany);
      mockJobsRepository.create.mockReturnValue(mockJob);
      mockSkillRepository.findOne.mockResolvedValue(existingSkill);

      await service.create(mockCreateJobDto, mockUser);

      expect(mockSkillRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return paginated jobs with search', async () => {
      const query: JobQueryDto = { search: 'developer', page: 1, limit: 10 };
      const mockJobs = [mockJob];
      const mockResult = { jobs: mockJobs, total: 1 };

      mockJobsRepository.findAll.mockResolvedValue([mockJobs, 1]);

      const result = await service.findAll(query);

      expect(result).toEqual(mockResult);
      expect(mockJobsRepository.findAll).toHaveBeenCalled();
    });

    it('should filter by location', async () => {
      const query: JobQueryDto = { location: 'Hanoi' };
      mockJobsRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll(query);

      expect(mockJobsRepository.findAll).toHaveBeenCalled();
    });

    it('should handle salary range filtering', async () => {
      const query: JobQueryDto = { salaryMin: 1000, salaryMax: 5000 };
      mockJobsRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll(query);

      expect(mockJobsRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a job by id', async () => {
      const sessionId = 'session-123';
      mockJobsRepository.findOne.mockResolvedValue(mockJob);
      mockJobViewsService.trackView.mockResolvedValue(undefined);

      const result = await service.findOne(1, mockUser, sessionId);

      expect(mockJobsRepository.findOne).toHaveBeenCalledWith(1, {
        populate: ['company', 'category', 'skills', 'tags', 'postedBy']
      });
      expect(mockJobViewsService.trackView).toHaveBeenCalledWith('1', mockUser, sessionId);
      expect(result).toEqual(mockJob);
    });

    it('should return null if job not found', async () => {
      mockJobsRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });

    it('should handle undefined user', async () => {
      mockJobsRepository.findOne.mockResolvedValue(mockJob);
      mockJobViewsService.trackView.mockResolvedValue(undefined);

      await service.findOne(1, undefined, undefined);

      expect(mockJobViewsService.trackView).toHaveBeenCalledWith('1', undefined, undefined);
    });
  });

  describe('findPopular', () => {
    it('should return popular jobs', async () => {
      const mockJobs = [mockJob];
      mockJobsRepository.find.mockResolvedValue(mockJobs);

      const result = await service.findPopular(5);

      expect(result).toEqual(mockJobs);
      expect(mockJobsRepository.find).toHaveBeenCalledWith(
        { status: JobStatus.ACTIVE },
        {
          populate: ['company', 'category'],
          orderBy: { viewsCount: 'DESC' },
          limit: 5,
        }
      );
    });

    it('should use default limit if not provided', async () => {
      mockJobsRepository.find.mockResolvedValue([]);

      await service.findPopular();

      expect(mockJobsRepository.find).toHaveBeenCalledWith(
        { status: JobStatus.ACTIVE },
        {
          populate: ['company', 'category'],
          orderBy: { viewsCount: 'DESC' },
          limit: 10,
        }
      );
    });
  });

  describe('findRecent', () => {
    it('should return recent jobs', async () => {
      const mockJobs = [mockJob];
      mockJobsRepository.find.mockResolvedValue(mockJobs);

      const result = await service.findRecent(3);

      expect(result).toEqual(mockJobs);
      expect(mockJobsRepository.find).toHaveBeenCalledWith(
        { status: JobStatus.ACTIVE },
        {
          populate: ['company', 'category'],
          orderBy: { postedAt: 'DESC' },
          limit: 3,
        }
      );
    });
  });

  describe('findByCompany', () => {
    it('should return jobs by company', async () => {
      const query: JobQueryDto = { page: 1, limit: 5 };
      const mockJobs = [mockJob];
      const mockResult = { jobs: mockJobs, total: 1 };

      mockJobsRepository.findAll.mockResolvedValue([mockJobs, 1]);

      const result = await service.findByCompany('1', query);

      expect(result).toEqual(mockResult);
    });
  });

  describe('update', () => {
    // Create mock roles collection
    const mockRolesCollection = {
      getItems: jest.fn().mockReturnValue([{ name: 'Employer' }])
    } as unknown as Collection<any>;

    it('should update job successfully', async () => {
      const updateDto = { title: 'Updated Job Title', description: 'Updated description' };
      const updatedJob = { ...mockJob, Title: 'Updated Job Title' };

      mockJobsRepository.findOneOrFail.mockResolvedValue(mockJob);
      mockEM.findOneOrFail.mockResolvedValue({ roles: mockRolesCollection });
      Object.assign = jest.fn();

      const result = await service.update(1, updateDto, mockUser);

      expect(result).toEqual(updatedJob);
    });

    it('should throw error if user is not the owner', async () => {
      mockJobsRepository.findOneOrFail.mockResolvedValue({
        ...mockJob,
        CompanyId: 2,
        postedBy: { id: 2 }
      });
      mockEM.findOneOrFail.mockResolvedValue({ roles: mockRolesCollection });

      await expect(service.update(1, {}, mockUser)).rejects.toThrow(
        'You can only update your own jobs'
      );
    });

    // Create mock admin roles collection
    const mockAdminRolesCollection = {
      getItems: jest.fn().mockReturnValue([{ name: 'Admin' }])
    } as unknown as Collection<any>;

    it('should allow admin to update any job', async () => {
      const updateDto = { title: 'Admin Updated Job' };
      mockJobsRepository.findOneOrFail.mockResolvedValue(mockJob);
      mockEM.findOneOrFail.mockResolvedValue({ roles: mockAdminRolesCollection });
      Object.assign = jest.fn();

      await service.update(1, updateDto, mockUser);

      expect(mockJobsRepository.findOneOrFail).toHaveBeenCalledWith(1, {
        populate: ['company']
      });
    });
  });

  describe('remove', () => {
    it('should delete job successfully', async () => {
      mockEM.findOneOrFail.mockResolvedValue({
        ...mockJob,
        CompanyId: 1
      });
      mockEM.findOneOrFail.mockResolvedValue({
        roles: mockRolesCollection,
        findOneOrFail: jest.fn().mockResolvedValue({ roles: mockRolesCollection })
      });

      await service.remove(1, mockUser);

      expect(mockJobsRepository.removeAndFlush).toHaveBeenCalled();
    });

    it('should throw error if user is not authorized', async () => {
      const mockUser2 = { id: 2 } as unknown as Users;
      mockEM.findOneOrFail.mockResolvedValue({
        ...mockJob,
        CompanyId: 1
      });
      mockEM.findOneOrFail.mockResolvedValue({ roles: mockRolesCollection });

      await expect(service.remove(1, mockUser2)).rejects.toThrow(
        'You can only delete your own jobs'
      );
    });
  });

  describe('getJobStats', () => {
    it('should return job statistics', async () => {
      const mockStats = {
        viewsCount: 100,
        recentViews: [],
      };

      mockEM.findOneOrFail.mockResolvedValue({
        ...mockJob,
        CompanyId: 1,
        ViewsCount: 100
      });
      mockEM.findOneOrFail.mockResolvedValue({ roles: mockRolesCollection });
      mockJobViewsService.getJobViews.mockResolvedValue({
        total: 100,
        views: []
      });

      const result = await service.getJobStats(1, mockUser);

      expect(result).toEqual({
        viewsCount: 100,
        totalViews: 100,
        recentViews: []
      });
    });

    it('should throw error if user not authorized for stats', async () => {
      const mockUser2 = { id: 2 } as unknown as Users;
      mockEM.findOneOrFail.mockResolvedValue({
        ...mockJob,
        CompanyId: 2
      });
      mockEM.findOneOrFail.mockResolvedValue({ roles: mockRolesCollection });

      await expect(service.getJobStats(1, mockUser2)).rejects.toThrow(
        'You can only view stats for your own jobs'
      );
    });
  });
});
