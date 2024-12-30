import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointments, Status } from './entities/appointments.entity';
import { CreateAppointmentDto } from './dto/create-appointments.input';
import { UpdateAppointmentDto } from './dto/update-appointments.input';
import { User } from '../users/entities/users.entity';
import { Service } from '../services/entities/services.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointments)
    private readonly appointmentsRepository: Repository<Appointments>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject User repository
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>, // Inject Service repository
  ) {}

  // Create a new appointment
  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointments> {
    const { status, user_id, service_id, rating } = createAppointmentDto;

    // Validate status, default to 'PENDING' if not provided
    const appointmentStatus = status || Status.PENDING;
    const enumValue = Status[appointmentStatus.toUpperCase()];
    if (!enumValue) {
      throw new BadRequestException(`Invalid status: ${appointmentStatus}`);
    }

    // Validate service
    const service = await this.serviceRepository.findOne({ where: { service_id } });
    if (!service) {
      throw new NotFoundException(`Service with ID ${service_id} not found`);
    }

    // Validate user if user_id is provided
    let user: User | undefined;
    if (user_id) {
      user = await this.userRepository.findOne({ where: { user_id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }
    }

    const newAppointment = this.appointmentsRepository.create({
      status: enumValue,
      service, // Associate the service
      user: user, //Give user as created user to this appointment
      rating, // Include rating if provided
    });

    return this.appointmentsRepository.save(newAppointment);
  }

  // Retrieve all appointments
  findAll(): Promise<Appointments[]> {
    return this.appointmentsRepository.find({ relations: ['user', 'service'] }); // Include user and service relations
  }

  // Find a single appointment by ID
  async findOne(appointment_id: number): Promise<Appointments> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { appointment_id },
      relations: ['user', 'service'], // Include user and service relations
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${appointment_id} not found`);
    }
    return appointment;
  }

  // Update an existing appointment
  async update(updateAppointmentDto: UpdateAppointmentDto): Promise<Appointments> {
    const { appointment_id, status, user_id, service_id, rating } = updateAppointmentDto;

    const appointment = await this.findOne(appointment_id);

    // Update status if provided
    if (status) {
      const enumValue = Status[status.toUpperCase().replace(' ', '_')];
      if (!enumValue) {
        throw new BadRequestException(`Invalid status type: ${status}`);
      }
      appointment.status = enumValue;
    }

    // Update service if provided
    if (service_id) {
      const service = await this.serviceRepository.findOne({ where: { service_id } });
      if (!service) {
        throw new NotFoundException(`Service with ID ${service_id} not found`);
      }
      appointment.service = service;
    }

    // Update rating if provided
    if (rating !== undefined) {
      appointment.rating = rating;
    }

    return this.appointmentsRepository.save(appointment);
  }

  async remove(id: number): Promise<boolean> {
    const appointment = await this.appointmentsRepository.findOne({ where: { appointment_id: id } });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    await this.appointmentsRepository.remove(appointment);
    return true;
  }
}
