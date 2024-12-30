import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsResolver } from './appointments.resolver';
import { AppointmentsService } from './appointments.service';
import { NotFoundException } from '@nestjs/common';
import { Appointments, Status } from './entities/appointments.entity';
import { CreateAppointmentDto } from './dto/create-appointments.input';
import { UpdateAppointmentDto } from './dto/update-appointments.input';

describe('AppointmentsResolver', () => {
  let resolver: AppointmentsResolver;
  let service: AppointmentsService;

  const mockAppointment = {
    appointment_id: 1,
    status: 'Pending',
    service: { service_id: 1, name: 'Test Service' },
    user_id: 1,
    rating: 5,
  };

  const mockCreateAppointmentDto: CreateAppointmentDto = {
    status: Status.PENDING,
    service_id: 1,
    user_id: 1,
    rating: 5,
  };

  const mockUpdateAppointmentDto: UpdateAppointmentDto = {
    appointment_id: 1,
    status: Status.COMPLETED,
    service_id: 1,
    user_id: 1,
    rating: 4,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppointmentsResolver,
        {
          provide: AppointmentsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockAppointment),
            findAll: jest.fn().mockResolvedValue([mockAppointment]),
            findOne: jest.fn().mockResolvedValue(mockAppointment),
            update: jest.fn().mockResolvedValue(mockAppointment),
            remove: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    resolver = module.get<AppointmentsResolver>(AppointmentsResolver);
    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createAppointment', () => {
    it('should create an appointment', async () => {
      const result = await resolver.createAppointment(mockCreateAppointmentDto);
      expect(result).toEqual(mockAppointment);
      expect(service.create).toHaveBeenCalledWith(mockCreateAppointmentDto);
    });
  });

  describe('getAllAppointments', () => {
    it('should return an array of appointments', async () => {
      const result = await resolver.getAllAppointments();
      expect(result).toEqual([mockAppointment]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('getAppointmentById', () => {
    it('should return an appointment by ID', async () => {
      const result = await resolver.getAppointmentById(1);
      expect(result).toEqual(mockAppointment);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if appointment not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException('Appointment not found'));

      await expect(resolver.getAppointmentById(1)).rejects.toThrowError(
        new NotFoundException('Appointment with ID 1 not found'),
      );
    });
  });

  describe('updateAppointment', () => {
    it('should update an appointment', async () => {
      const result = await resolver.updateAppointment(mockUpdateAppointmentDto);
      expect(result).toEqual(mockAppointment);
      expect(service.update).toHaveBeenCalledWith(mockUpdateAppointmentDto);
    });
  });

  describe('removeAppointment', () => {
    it('should remove an appointment', async () => {
      const result = await resolver.removeAppointment(1);
      expect(result).toBe(true);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  
    it('should throw NotFoundException if appointment not found during removal', async () => {
      // Mock the remove method to simulate appointment not found
      jest.spyOn(service, 'remove').mockRejectedValueOnce(
        new NotFoundException('Appointment with ID 1 not found'),
      );
  
      await expect(resolver.removeAppointment(1)).rejects.toThrowError(
        new NotFoundException('Appointment with ID 1 not found'),
      );
    });
  });
});
