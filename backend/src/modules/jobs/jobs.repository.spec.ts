import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/core';
import { JobsRepository } from './jobs.repository';
import { Job } from '../../entities/job.entity';

describe('JobsRepository', () => {
  let repository: JobsRepository;
  let em: EntityManager;

  const mockJob = {
    JobId: 1,
    Title: 'Test Job',
    Slug: 'test-job',
    CompanyId: 1,
    PostedByUserId: 1,
    CreatedAt: new Date(),
  } as Job;

  const mockEM = {
    getConnection: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsRepository,
        {
          provide: EntityManager,
          useValue: mockEM,
        },
      ],
    }).compile();

    repository = module.get<JobsRepository>(JobsRepository);
    em = module.get<EntityManager>(EntityManager);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should call stored procedure and return results', async () => {
      const mockConnection = { execute: jest.fn() };
      const mockResults = [mockJob];

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue(mockResults);

      const result = await repository.findAll();

      expect(mockConnection.execute).toHaveBeenCalledWith('EXEC SP_GetAllJob');
      expect(result).toEqual(mockResults);
    });
  });

  describe('findOne', () => {
    it('should call stored procedure and return job', async () => {
      const mockConnection = { execute: jest.fn() };
      const mockResults = [mockJob];

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue(mockResults);

      const result = await repository.findOne('1');

      expect(mockConnection.execute).toHaveBeenCalledWith('EXEC SP_GetJobById ?', ['1']);
      expect(result).toEqual(mockJob);
    });

    it('should return null if no job found', async () => {
      const mockConnection = { execute: jest.fn() };

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue([]);

      const result = await repository.findOne('999');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should call stored procedure with parameters', async () => {
      const mockConnection = { execute: jest.fn() };
      const createData = {
        companyId: 1,
        title: 'New Job',
        slug: 'new-job',
        shortDescription: 'Short desc',
        description: 'Job description',
        location: 'Hanoi',
        salaryMin: 1000,
        salaryMax: 2000,
      } as any;

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue([mockJob]);

      const result = await repository.create(createData);

      expect(mockConnection.execute).toHaveBeenCalledWith('EXEC SP_PostJob ?, ?, ?, ?, ?, ?, ?', [
        'New Job',
        'new-job',
        undefined, // shortDescription
        'Job description',
        'Hanoi',
        1000,
        2000,
      ]);
      expect(result).toEqual(mockJob);
    });
  });

  describe('update', () => {
    it('should call stored procedure and return updated job', async () => {
      const mockConnection = { execute: jest.fn() };
      const updateData = {
        id: '1',
        title: 'Updated Title',
        shortDescription: 'Updated desc',
        description: 'Updated description',
      };

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValueOnce(undefined); // SP_UpdateJob call
      mockConnection.execute.mockResolvedValueOnce([mockJob]); // findOne call

      const result = await repository.update(updateData);

      expect(mockConnection.execute).toHaveBeenCalledWith('EXEC SP_UpdateJob ?, ?, ?, ?', [
        '1',
        'Updated Title',
        'Updated desc',
        'Updated description',
      ]);
      expect(result).toEqual(mockJob);
    });
  });

  describe('delete', () => {
    it('should call stored procedure and return true', async () => {
      const mockConnection = { execute: jest.fn() };

      mockEM.getConnection.mockReturnValue(mockConnection);
      mockConnection.execute.mockResolvedValue(undefined);

      const result = await repository.delete('1');

      expect(mockConnection.execute).toHaveBeenCalledWith('EXEC SP_DeleteJob ?', ['1']);
      expect(result).toBe(true);
    });
  });
});
