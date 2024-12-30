import { DataSource } from 'typeorm';
import { User } from './modules/users/entities/users.entity';
import { Appointments, Status } from './modules/appointments/entities/appointments.entity';
import { Business } from './modules/businesses/entities/business.entity';
import { Service } from './modules/services/entities/services.entity';

import * as dotenv from 'dotenv';
dotenv.config(); // This loads the .env file

// Create the DataSource instance
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_DATABASE : process.env.DB_DATABASE,
  entities: [User, Appointments, Business, Service],
  synchronize: false, // Avoid accidental schema drops; ensure tables already exist
});

async function seedDatabase() {
  try {
    await dataSource.initialize();
    console.log('Seeding started...');

    // Seed Users
    const userRepository = dataSource.getRepository(User);
    const users = [
      {
        user_id: 1,
        username: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123', // Assuming hashed passwords are not required for seeding
      },
      {
        user_id: 2,
        username: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'password456',
      },
      {
        user_id: 3,
        username: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'password789',
      },
    ];
    await userRepository.save(users);
    console.log(`Inserted ${users.length} users`);

    // Seed Businesses
    const businessRepository = dataSource.getRepository(Business);
    const businesses = [
      {
        business_id: 1,
        business_name: 'Beauty Salon A',
        email: 'contact@beautysalona.com',
        phone_number: '123-456-7890',
        address: '123 Main St, Cityville, Country',
        operating_hours: '9:00 AM - 6:00 PM',
      },
      {
        business_id: 2,
        business_name: 'Beauty Salon B',
        email: 'contact@beautysalonb.com',
        phone_number: '987-654-3210',
        address: '456 Elm St, Townsville, Country',
        operating_hours: '10:00 AM - 7:00 PM',
      },
    ];
    await businessRepository.save(businesses);
    console.log(`Inserted ${businesses.length} businesses`);

    // Seed Services
    const serviceRepository = dataSource.getRepository(Service);
    const services = [
      {
        service_id: 1,
        service_name: 'Facial Treatment',
        service_type: 'Beauty',
        description: 'A rejuvenating facial treatment.',
        price: 50.0,
        business_id: 1, // Linking to the first business
      },
      {
        service_id: 2,
        service_name: 'Massage',
        service_type: 'Wellness',
        description: 'Relaxing full-body massage.',
        price: 70.0,
        business_id: 2, // Linking to the second business
      },
    ];
    await serviceRepository.save(services);
    console.log(`Inserted ${services.length} services`);

    // Seed Appointments
    const appointmentRepository = dataSource.getRepository(Appointments);
    const appointments = [
      {
        appointment_id: 1,
        status: Status.COMPLETED,
        rating: 5,
        user_id: 1, // Linking to Alice Johnson
        service_id: 1, // Linking to Facial Treatment
      },
      {
        appointment_id: 2,
        status: Status.PENDING,
        rating: null,
        user_id: 2, // Linking to Bob Smith
        service_id: 2, // Linking to Massage
      },
    ];
    await appointmentRepository.save(appointments);
    console.log(`Inserted ${appointments.length} appointments`);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

seedDatabase();
