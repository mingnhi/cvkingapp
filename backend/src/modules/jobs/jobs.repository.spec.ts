import { Test, TestingModule } from '@nestjs/testing';
import { EntityRepository, EntityManager } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { JobsRepository } from './jobs.repository';
import { Job } from '../../entities/job.entity';

describe('JobsRepository', () => {
  let repository: JobsRepository;
  let jobRepository: EntityRepository<Job>;
  let em: EntityManager;

  const mockJob = {
    JobId: 1,
    Title: 'Test Job',
    Slug: 'test-job',
    Status: 'Active',
    CompanyId: 1,
    PostedByUserId: 1,
    PostedAt: new Date(),
    CreatedAt: new Date(),
    ViewsCount: 0,
    company: { CompanyId: '1', name: 'Test Company' },
    skills: [],
    tags: [],
  } as unknown as Job;

  const mockJobRepository = {
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
  };

  const mockEM = {
    persistAndFlush: jest.fn(),
    removeAndFlush: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsRepository,
        {
          provide: getRepositoryToken(Job),
          useValue: mockJobRepository,
        },
        {
          provide: EntityManager,
          useValue: mockEM,
        },
      ],
    }).compile();

    repository = module.get<JobsRepository>(JobsRepository);
    jobRepository = module.get(getRepositoryToken(Job));
    em = module.get<EntityManager>(EntityManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should find and count jobs with options', async () => {
      const where = { status: 'ACTIVE' };
      const options = { populate: ['company'], limit: 10 };
      const mockResult = [[mockJob], 1];

      mockJobRepository.findAndCount.mockResolvedValue(mockResult);

      const result = await repository.findAll(where, options);

      expect(mockJobRepository.findAndCount).toHaveBeenCalledWith(where, options);
      expect(result).toEqual(mockResult);
    });
  });

  describe('findOne', () => {
    it('should find one job by id', async () => {
      const id = 1;
      const options = { populate: ['company'] };

      mockJobRepository.findOne.mockResolvedValue(mockJob);

      const result = await repository.findOne(id, options);

      expect(mockJobRepository.findOne).toHaveBeenCalledWith({ JobId: id }, { populate: ['company'] });
      expect(result).toEqual(mockJob);
    });

    it('should return null if job not found', async () => {
      const id = 999;
      mockJobRepository.findOne.mockResolvedValue(null);

      const result = await repository.findOne(id);

      expect(mockJobRepository.findOne).toHaveBeenCalledWith({ JobId: id }, { populate: [] });
      expect(result).toBeNull();
    });
  });

  describe('findOneOrFail', () => {
    it('should return job if found', async () => {
      const id = 1;
      const populate = { populate: ['company'] };
      mockJobRepository.findOne.mockResolvedValue(mockJob);

      const result = await repository.findOneOrFail(id, populate);

      expect(mockJobRepository.findOne).toHaveBeenCalledWith({ JobId: id }, populate);
      expect(result).toEqual(mockJob);
    });

    it('should throw error if job not found', async () => {
      const id = 999;
      mockJobRepository.findOne.mockResolvedValue(null);

      await expect(repository.findOneOrFail(id)).rejects.toThrow(
        `Job with id ${id} not found`
      );
    });
  });

  describe('find', () => {
    it('should find jobs matching where conditions', async () => {
      const where = { status: 'ACTIVE' };
      const options = { orderBy: { createdAt: 'DESC' } };
      const mockJobs = [mockJob];

      mockJobRepository.find.mockResolvedValue(mockJobs);

      const result = await repository.find(where, options);

      expect(mockJobRepository.find).toHaveBeenCalledWith(where, options);
      expect(result).toEqual(mockJobs);
    });
  });

  describe('create', () => {
    it('should create and persist a new job entity', async () => {
      const data = { title: 'New Job', company: mockJob.company };
      const newJob = { ...mockJob, ...data };

      mockJobRepository.create.mockReturnValue(newJob);
      mockEM.persistAndFlush.mockResolvedValue(undefined);

      const result = await repository.create(data);

      expect(mockJobRepository.create).toHaveBeenCalledWith(data);
      expect(mockEM.persistAndFlush).toHaveBeenCalledWith(newJob);
      expect(result).toEqual(newJob);
    });
  });

  describe('persistAndFlush', () => {
    it('should persist and flush entity', async () => {
      await repository.persistAndFlush(mockJob as Job);

      expect(mockEM.persistAndFlush).toHaveBeenCalledWith(mockJob);
    });
  });

  describe('removeAndFlush', () => {
    it('should remove and flush entity', async () => {
      await repository.removeAndFlush(mockJob as Job);

      expect(mockEM.removeAndFlush).toHaveBeenCalledWith(mockJob);
    });
  });
});
