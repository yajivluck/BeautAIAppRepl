import { Test, TestingModule } from '@nestjs/testing';
import { BusinessesResolver } from './businesses.resolver';
import { BusinessesService } from './businesses.service';
import { CreateBusinessInput } from './dto/create-business.input';
import { UpdateBusinessInput } from './dto/update-business.input';
import { Business } from './entities/business.entity';
import { NotFoundException } from '@nestjs/common';
import { Appointments, Status } from '../appointments/entities/appointments.entity';
import { Service } from '../services/entities/services.entity';
import { User } from '../users/entities/users.entity';

//Mock User
const mockUser: User = {
  user_id: 1,
  name: 'non_unique_name',
  username: 'unique_username',
  email: 'user@example.com',
  password: 'hashedpassword',
};

// Mock Business
const mockBusiness: Business = {
  business_id: 1,
  business_name: 'Test Business',
  email: 'test@example.com',
  phone_number: '1234567890',
  address: '123 Business St.',
  operating_hours: '9 AM - 5 PM',
  created_at: new Date(),
  updated_at: new Date(),
  services: [],  // Initialize an empty array for services
};

// Mock Service and associate it with the mockBusiness
const mockService: Service = {
  service_id: 1,
  service_name: 'Web Development',
  service_type: 'Test_Type',
  business: mockBusiness,  // Reference the mockBusiness object here
  price: 500.00,
  created_at: new Date(),
  updated_at: new Date(),
  appointments: [], // Add the mock appointment to the appointments array
};

// Mock Appointment
const mockAppointment: Appointments = {
  appointment_id: 1,
  status: Status.PENDING, // Assuming status is a string, or use an enum value if applicable
  service: mockService, // Reference the mockService object here
  user: mockUser, //MockUser as user who took this appointment
  rating: 5, // Example rating
};

// Add the service to the mockBusiness services array
mockBusiness.services.push(mockService);

//Add appointment to service
mockService.appointments.push(mockAppointment);

const createBusinessInput: CreateBusinessInput = {
  business_name: 'Test Business',
  email: 'test@example.com',
  phone_number: '1234567890',
  address: '123 Business St.',
  operating_hours: '9 AM - 5 PM',
};

const updateBusinessInput: UpdateBusinessInput = {
  business_name: 'Updated Business',
  email: 'updated@example.com',
  phone_number: '0987654321',
  address: '456 New St.',
  operating_hours: '10 AM - 6 PM',
};

describe('BusinessesResolver', () => {
  let resolver: BusinessesResolver;
  let service: BusinessesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessesResolver,
        {
          provide: BusinessesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockBusiness]),
            findOne: jest.fn().mockResolvedValue(mockBusiness),
            create: jest.fn().mockResolvedValue(mockBusiness),
            update: jest.fn().mockResolvedValue(mockBusiness),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    resolver = module.get<BusinessesResolver>(BusinessesResolver);
    service = module.get<BusinessesService>(BusinessesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAllBusinesses', () => {
    it('should return an array of businesses', async () => {
      const result = await resolver.findAllBusinesses();
      expect(result).toEqual([mockBusiness]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findBusinessById', () => {
    it('should return a business by provider_id', async () => {
      const result = await resolver.findBusinessById(1);
      expect(result).toEqual(mockBusiness);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if business not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());
      try {
        await resolver.findBusinessById(999); // non-existing ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createBusiness', () => {
    it('should create a new business', async () => {
      const result = await resolver.createBusiness(createBusinessInput);
      expect(result).toEqual(mockBusiness);
      expect(service.create).toHaveBeenCalledWith(createBusinessInput);
    });
  });

  describe('updateBusiness', () => {
    it('should update a business', async () => {
      const result = await resolver.updateBusiness(1, updateBusinessInput);
      expect(result).toEqual(mockBusiness);
      expect(service.update).toHaveBeenCalledWith(1, updateBusinessInput);
    });

    it('should throw NotFoundException if business not found', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new NotFoundException());
      try {
        await resolver.updateBusiness(999, updateBusinessInput); // non-existing ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteBusiness', () => {
    it('should delete a business', async () => {
      const result = await resolver.deleteBusiness(1);
      expect(result).toBe(true);
      expect(service.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if business not found', async () => {
      jest.spyOn(service, 'delete').mockRejectedValueOnce(new NotFoundException());
      try {
        await resolver.deleteBusiness(999); // non-existing ID
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
