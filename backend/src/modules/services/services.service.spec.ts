import { Test, TestingModule } from '@nestjs/testing';
import { ServicesService } from './services.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/services.entity';
import { CreateServicesInput } from './dto/create-services.input';
import { UpdateServicesInput } from './dto/update-services.input';
import { NotFoundException } from '@nestjs/common';

describe('ServicesService', () => {
  let service: ServicesService;
  let repository: Repository<Service>;

  // Mock data for testing
  const mockService = {
    service_id: 1,
    service_name: 'Web Development',
    service_description: 'Website development services',
    price: 500.0,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const createServiceInput: CreateServicesInput = {
    service_name: 'Web Development',
    service_description: 'Website development services',
    price: 500.0,
    service_type : "Test Service",
    business_id: 1
  };

  const updateServiceInput: UpdateServicesInput = {
    service_id: 1,
    service_name: 'Updated Web Development',
    price: 600.0,
    business_id: 1
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesService,
        {
          provide: getRepositoryToken(Service),
          useValue: {
            create: jest.fn().mockReturnValue(mockService),
            save: jest.fn().mockResolvedValue(mockService),
            find: jest.fn().mockResolvedValue([mockService]),
            findOneOrFail: jest.fn().mockResolvedValue(mockService),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<ServicesService>(ServicesService);
    repository = module.get<Repository<Service>>(getRepositoryToken(Service));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new service', async () => {
      const result = await service.create(createServiceInput);
      expect(result).toEqual(mockService);
      expect(repository.create).toHaveBeenCalledWith(createServiceInput);
      expect(repository.save).toHaveBeenCalledWith(mockService);
    });
  });

  describe('findAll', () => {
    it('should return an array of services', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockService]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a service by service_id', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockService);
      expect(repository.findOneOrFail).toHaveBeenCalledWith({ where: { service_id: 1 } });
    });

    it('should throw NotFoundException if service not found', async () => {
      jest.spyOn(repository, 'findOneOrFail').mockRejectedValueOnce(new NotFoundException());
      try {
        await service.findOne(999); // non-existing ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a service', async () => {
      const result = await service.update(updateServiceInput);
      expect(result).toEqual(mockService);
      expect(repository.findOneOrFail).toHaveBeenCalledWith({ where: { service_id: 1 } });
      expect(repository.save).toHaveBeenCalledWith(mockService);
    });

    it('should throw NotFoundException if service not found', async () => {
      jest.spyOn(repository, 'findOneOrFail').mockRejectedValueOnce(new NotFoundException());
      try {
        await service.update(updateServiceInput); // non-existing ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove a service', async () => {
      const result = await service.remove(1);
      expect(result).toBe(true);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  
    it('should throw NotFoundException if service not found', async () => {
      // Mocking delete to return a DeleteResult with the expected structure
      jest.spyOn(repository, 'delete').mockResolvedValueOnce({
        affected: 0,
        raw: [], // raw is required in DeleteResult, even if it's an empty array or object
      });
  
      try {
        await service.remove(999); // non-existing ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
  
});
