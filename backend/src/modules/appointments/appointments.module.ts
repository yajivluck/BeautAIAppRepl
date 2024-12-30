import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointments } from './entities/appointments.entity';
import { User } from '../users/entities/users.entity';
import { UsersModule } from '../users/users.module';
import { ServicesModule } from '../services/services.module'; // Import ServicesModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointments, User]),
    UsersModule,
    ServicesModule, // Add this line
  ],
  providers: [AppointmentsResolver, AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
