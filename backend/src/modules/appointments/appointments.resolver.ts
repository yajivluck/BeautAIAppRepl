import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointments.input';
import { UpdateAppointmentDto } from './dto/update-appointments.input';
import { Appointments } from './entities/appointments.entity';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Appointments)
export class AppointmentsResolver {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // Create a new appointment
  @Mutation(() => Appointments)
  async createAppointment(
    @Args('createAppointmentDto') createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointments> {
    return this.appointmentsService.create(createAppointmentDto);
  }

  // Retrieve all appointments
  @Query(() => [Appointments], { name: 'getAllAppointments' })
  async getAllAppointments(): Promise<Appointments[]> {
    return this.appointmentsService.findAll();
  }

  // Find a single appointment by ID
  @Query(() => Appointments, { name: 'getAppointmentById' })
  async getAppointmentById(
    @Args('appointment_id', { type: () => Int }) appointment_id: number,
  ): Promise<Appointments> {
    try {
      return await this.appointmentsService.findOne(appointment_id);
    } catch (error) {
      throw new NotFoundException(`Appointment with ID ${appointment_id} not found`);
    }
  }

  // Update an existing appointment
  @Mutation(() => Appointments)
  async updateAppointment(
    @Args('updateAppointmentDto') updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointments> {
    return this.appointmentsService.update(updateAppointmentDto);
  }

  // Remove an appointment
  @Mutation(() => Boolean)
  async removeAppointment(
    @Args('appointment_id', { type: () => Int }) appointment_id: number,
  ): Promise<boolean> {
    return this.appointmentsService.remove(appointment_id);
  }
}
