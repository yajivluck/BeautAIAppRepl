import { Test, TestingModule } from '@nestjs/testing';
import { BusinessesService } from './businesses.service';
import { Business } from './entities/business.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateBusinessInput } from './dto/create-business.input';
import { UpdateBusinessInput } from './dto/update-business.input';

describe('BusinessesService', () => {
  let service: BusinessesService;
  let repository: Repository<Business>;

  const mockBusinessRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessesService,
        {
          provide: getRepositoryToken(Business),
          useValue: mockBusinessRepository,
        },
      ],
    }).compile();

    service = module.get<BusinessesService>(BusinessesService);
    repository = module.get<Repository<Business>>(getRepositoryToken(Business));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a business', async () => {
      const createBusinessInput: CreateBusinessInput = {
        business_name: 'Test Business',
        email: 'test@business.com',
        phone_number: '1234567890',
        address: '123 Test St',
        operating_hours: '9AM - 5PM',
      };

      const mockBusiness = { business_id: 1, ...createBusinessInput } as Business;
      mockBusinessRepository.create.mockReturnValue(mockBusiness);
      mockBusinessRepository.save.mockResolvedValue(mockBusiness);

      const result = await service.create(createBusinessInput);
      expect(result).toEqual(mockBusiness);
      expect(mockBusinessRepository.create).toHaveBeenCalledWith(createBusinessInput);
      expect(mockBusinessRepository.save).toHaveBeenCalledWith(mockBusiness);
    });
  });

  describe('findAll', () => {
    it('should return an array of businesses', async () => {
      const mockBusinesses = [
        { business_id: 1, business_name: 'Test Business 1' } as Business,
        { business_id: 2, business_name: 'Test Business 2' } as Business,
      ];
      mockBusinessRepository.find.mockResolvedValue(mockBusinesses);

      const result = await service.findAll();
      expect(result).toEqual(mockBusinesses);
      expect(mockBusinessRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a business by ID', async () => {
      const mockBusiness = { business_id: 1, business_name: 'Test Business' } as Business;
      mockBusinessRepository.findOneOrFail.mockResolvedValue(mockBusiness);

      const result = await service.findOne(1);
      expect(result).toEqual(mockBusiness);
      expect(mockBusinessRepository.findOneOrFail).toHaveBeenCalledWith({ where: { business_id: 1 } });
    });

    it('should throw a NotFoundException if business is not found', async () => {
      mockBusinessRepository.findOneOrFail.mockRejectedValue(new NotFoundException());

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the business', async () => {
      const updateBusinessInput: UpdateBusinessInput = { business_name: 'Updated Business' };
      const mockBusiness = { business_id: 1, business_name: 'Test Business' } as Business;
      mockBusinessRepository.findOne.mockResolvedValue(mockBusiness);
      mockBusinessRepository.save.mockResolvedValue({ ...mockBusiness, ...updateBusinessInput });

      const result = await service.update(1, updateBusinessInput);
      expect(result.business_name).toEqual('Updated Business');
      expect(mockBusinessRepository.findOne).toHaveBeenCalledWith({ where: { business_id: 1 } });
      expect(mockBusinessRepository.save).toHaveBeenCalledWith({ ...mockBusiness, ...updateBusinessInput });
    });

    it('should throw a NotFoundException if business is not found', async () => {
      mockBusinessRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, { business_name: 'Non-existent Business' }))
        .rejects
        .toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete the business and return true', async () => {
      mockBusinessRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.delete(1);
      expect(result).toBe(true);
      expect(mockBusinessRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if business is not found', async () => {
      mockBusinessRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
