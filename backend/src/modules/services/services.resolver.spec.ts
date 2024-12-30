import { Test, TestingModule } from '@nestjs/testing';
import { ServicesResolver } from './services.resolver';
import { ServicesService } from './services.service';
import { Service } from './entities/services.entity';
import { CreateServicesInput } from './dto/create-services.input';
import { UpdateServicesInput } from './dto/update-services.input';
import { NotFoundException } from '@nestjs/common';

describe('ServicesResolver', () => {
  let resolver: ServicesResolver;
  let service: ServicesService;

   // Mock data for testing
   const mockService = {
    service_id: 1,
    service_name: 'Web Development',
    service_description: 'Website development services',
    price: 500.0,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const mockCreateServiceInput: CreateServicesInput = {
    service_name: 'Web Development',
    service_description: 'Website development services',
    price: 500.0,
    service_type : "Test Service",
    business_id: 1
  };

  const mockUpdateServiceInput: UpdateServicesInput = {
    service_id: 1,
    service_name: 'Updated Web Development',
    price: 600.0,
    business_id: 1
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServicesResolver,
        {
          provide: ServicesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockService),
            findAll: jest.fn().mockResolvedValue([mockService]),
            findOne: jest.fn().mockResolvedValue(mockService),
            update: jest.fn().mockResolvedValue(mockService),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    resolver = module.get<ServicesResolver>(ServicesResolver);
    service = module.get<ServicesService>(ServicesService);
  });

  describe('createService', () => {
    it('should create a service', async () => {
      const result = await resolver.createService(mockCreateServiceInput);
      expect(result).toEqual(mockService);
      expect(service.create).toHaveBeenCalledWith(mockCreateServiceInput);
    });
  });

  describe('findAllServices', () => {
    it('should return an array of services', async () => {
      const result = await resolver.findAllServices();
      expect(result).toEqual([mockService]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findServiceById', () => {
    it('should return a service by ID', async () => {
      const result = await resolver.findServiceById(1);
      expect(result).toEqual(mockService);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if service not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);
      try {
        await resolver.findServiceById(999); // non-existing ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Service with ID 999 not found');
      }
    });
  });

  describe('updateService', () => {
    it('should update a service', async () => {
      const result = await resolver.updateService(mockUpdateServiceInput);
      expect(result).toEqual(mockService);
      expect(service.update).toHaveBeenCalledWith(mockUpdateServiceInput);
    });
  });

  describe('removeService', () => {
    it('should remove a service', async () => {
      const result = await resolver.removeService(1);
      expect(result).toBe(true);
      expect(service.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if service not found', async () => {
      jest.spyOn(service, 'remove').mockResolvedValueOnce(false);
      try {
        await resolver.removeService(999); // non-existing ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Service with ID 999 not found');
      }
    });
  });
});
