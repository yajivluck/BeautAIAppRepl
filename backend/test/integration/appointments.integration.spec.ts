import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'; // Main app module
import { DataSource } from 'typeorm';
import { AppointmentsService } from '../../src/modules/appointments/appointments.service'; // Ensure the correct path
import {
  Appointments,
  Status,
} from '../../src/modules/appointments/entities/appointments.entity';
import { User } from '../../src/modules/users/entities/users.entity';
import { Service } from '../../src/modules/services/entities/services.entity';
import { ServicesService } from '../../src/modules/services/services.service';
import { BusinessesService } from '../../src/modules/businesses/businesses.service'; // Add the BusinessesService
import { Business } from '../../src/modules/businesses/entities/business.entity'; // Add Business entity

describe('AppointmentsModule (Integration)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let appointmentsService: AppointmentsService;
  let businessesService: BusinessesService; // Add the businessesService
  let createdBusiness: Business;
  let createdService: Service;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Using the main app module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    appointmentsService = app.get(AppointmentsService);
    businessesService = app.get(BusinessesService); // Get BusinessesService
    dataSource = app.get(DataSource);

    console.log('Application initialized and ready for testing.');

    // Create a business entry to be used in the service tests
    const createBusinessInput = {
      business_name: 'Test Business for Appointment',
      email: 'test@business.com',
      phone_number: '123-456-7890',
      address: '123 Business St, City, Country',
      operating_hours: '9:00 AM - 5:00 PM',
    };

    console.log('Creating business for appointment tests...');
    createdBusiness = await businessesService.create(createBusinessInput);
    console.log('Created business:', createdBusiness);

    // Create a service for the appointment
    const createServiceInput = {
      service_name: 'Test Service',
      price: 100,
      service_type: 'Type A',
      business_id: createdBusiness.business_id, // Link to the created business
    };

    console.log('Creating service...');
    createdService = await app.get(ServicesService).create(createServiceInput);
    console.log('Created service:', createdService);
  });

  afterAll(async () => {
    await app.close();
    console.log('Application closed after tests.');
  });

  describe('POST /graphql - Create Appointment', () => {
    it('should create a new appointment', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createAppointment(createAppointmentDto: { service_id: ${createdService.service_id}}) {
                appointment_id
                status
              }
            }
          `,
        });
  
      expect(response.status).toBe(200);
      expect(response.body.data.createAppointment).toEqual({
        appointment_id: expect.any(Number),
        status: 'PENDING',
      });
    });
  });

  describe('GET /graphql - Get All Appointments', () => {
    it('should return all appointments', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              getAllAppointments {
                appointment_id
                status
              }
            }
          `,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.getAllAppointments).toEqual(
        expect.arrayContaining([
          {
            appointment_id: expect.any(Number),
            status: expect.any(String),
          },
        ]),
      );
    });
  });

  describe('GET /graphql - Get Appointment By ID', () => {
    it('should return a specific appointment by ID', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              getAppointmentById(appointment_id: 1) {
                appointment_id
                status
              }
            }
          `,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.getAppointmentById).toEqual({
        appointment_id: 1,
        status: "PENDING",
      });
    });

    it('should return an error if the appointment is not found', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              getAppointmentById(appointment_id: 999) {
                appointment_id
              }
            }
          `,
        });

      expect(response.status).toBe(200);
      expect(response.body.errors[0].message).toContain(
        'Appointment with ID 999 not found',
      );
    });
  });

  describe('PATCH /graphql - Update Appointment', () => {
    it('should update an existing appointment', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              updateAppointment(updateAppointmentDto: { appointment_id: 1, status: COMPLETED }) {
                appointment_id
                status
              }
            }
          `,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.updateAppointment).toEqual({
        appointment_id: 1,
        status: 'COMPLETED',
      });
    });
  });

  describe('DELETE /graphql - Remove Appointment', () => {
    it('should remove an appointment', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              removeAppointment(appointment_id: 1)
            }
          `,
        });

      expect(response.status).toBe(200);
      expect(response.body.data.removeAppointment).toBe(true);
    });

    it('should return an error if the appointment does not exist', async () => {
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              removeAppointment(appointment_id: 999)
            }
          `,
        });

      expect(response.status).toBe(200);
      expect(response.body.errors[0].message).toContain(
        'Appointment with ID 999 not found',
      );
    });
  });
});
