import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Appointments, Status } from './entities/appointments.entity';
import { User } from '../users/entities/users.entity';
import { Service } from '../services/entities/services.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('AppointmentsService', () => {
  let service: AppointmentsService;
  let appointmentsRepository: Repository<Appointments>;
  let userRepository: Repository<User>;
  let serviceRepository: Repository<Service>;

  const mockAppointment = {
    appointment_id: 1,
    status: Status.PENDING,
    user_id: 1,
    service_id: 1,
    rating: 5,
  };

  const mockUser = {
    user_id: 1,
    name: 'Test User',
  };

  const mockService = {
    service_id: 1,
    name: 'Test Service',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: getRepositoryToken(Appointments),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Service),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
    appointmentsRepository = module.get<Repository<Appointments>>(getRepositoryToken(Appointments));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    serviceRepository = module.get<Repository<Service>>(getRepositoryToken(Service));
  });

  describe('create', () => {
    it('should create a new appointment', async () => {
      const createAppointmentDto = {
        status: Status.PENDING,
        user_id: 1,
        service_id: 1,
        rating: 5,
      };

      jest.spyOn(serviceRepository, 'findOne').mockResolvedValue(mockService as any);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as any);
      jest.spyOn(appointmentsRepository, 'create').mockReturnValue(mockAppointment as any);
      jest.spyOn(appointmentsRepository, 'save').mockResolvedValue(mockAppointment as any);

      const result = await service.create(createAppointmentDto);

      expect(result).toEqual(mockAppointment);
      expect(appointmentsRepository.save).toHaveBeenCalledWith(mockAppointment);
    });

    it('should throw NotFoundException if service is not found', async () => {
      const createAppointmentDto = {
        status: Status.PENDING,
        user_id: 1,
        service_id: 1,
        rating: 5,
      };

      jest.spyOn(serviceRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createAppointmentDto)).rejects.toThrow(
        new NotFoundException('Service with ID 1 not found'),
      );
    });

    it('should throw NotFoundException if user is not found', async () => {
      const createAppointmentDto = {
        status: Status.PENDING,
        user_id: 1,
        service_id: 1,
        rating: 5,
      };

      jest.spyOn(serviceRepository, 'findOne').mockResolvedValue(mockService as any);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.create(createAppointmentDto)).rejects.toThrow(
        new NotFoundException('User with ID 1 not found'),
      );
    });
  });

  describe('findAll', () => {
    it('should return all appointments', async () => {
      jest.spyOn(appointmentsRepository, 'find').mockResolvedValue([mockAppointment as any]);

      const result = await service.findAll();

      expect(result).toEqual([mockAppointment]);
    });
  });

  describe('findOne', () => {
    it('should return an appointment by id', async () => {
      jest.spyOn(appointmentsRepository, 'findOne').mockResolvedValue(mockAppointment as any);

      const result = await service.findOne(1);

      expect(result).toEqual(mockAppointment);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      jest.spyOn(appointmentsRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Appointment with ID 1 not found'),
      );
    });
  });

  describe('update', () => {
    it('should update an appointment', async () => {
      const updateAppointmentDto = {
        appointment_id: 1,
        status: Status.COMPLETED,
        user_id: 1,
        service_id: 1,
        rating: 4,
      };

      const updatedAppointment = { ...mockAppointment, status: Status.COMPLETED, rating: 4 };

      jest.spyOn(serviceRepository, 'findOne').mockResolvedValue(mockService as any);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as any);
      jest.spyOn(appointmentsRepository, 'findOne').mockResolvedValue(mockAppointment as any);
      jest.spyOn(appointmentsRepository, 'save').mockResolvedValue(updatedAppointment as any);

      const result = await service.update(updateAppointmentDto);

      expect(result).toEqual(updatedAppointment);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      const updateAppointmentDto = { appointment_id: 1, status: Status.COMPLETED };

      jest.spyOn(appointmentsRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(updateAppointmentDto)).rejects.toThrow(
        new NotFoundException('Appointment with ID 1 not found'),
      );
    });

    it('should throw NotFoundException if service not found during update', async () => {
      const updateAppointmentDto = { appointment_id: 1, service_id: 2 };

      jest.spyOn(appointmentsRepository, 'findOne').mockResolvedValue(mockAppointment as any);
      jest.spyOn(serviceRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(updateAppointmentDto)).rejects.toThrow(
        new NotFoundException('Service with ID 2 not found'),
      );
    });
  });
  
  describe('remove', () => {
    it('should remove an appointment', async () => {
      // Mock the findOne method to return the appointment
      jest.spyOn(appointmentsRepository, 'findOne').mockResolvedValue(mockAppointment as any);
  
      // Mock the remove method correctly
      jest.spyOn(appointmentsRepository, 'remove').mockResolvedValue(mockAppointment as any);
  
      const result = await service.remove(1);
  
      expect(result).toBe(true);
    });
  
    it('should throw NotFoundException if appointment not found during remove', async () => {
      // Mock the findOne method to return null (appointment not found)
      jest.spyOn(appointmentsRepository, 'findOne').mockResolvedValue(null);
  
      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('Appointment with ID 1 not found'),
      );
    });
  });
  
});
