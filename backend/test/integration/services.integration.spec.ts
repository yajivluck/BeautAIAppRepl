import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'; // Main app module
import { DataSource } from 'typeorm';
import { ServicesService } from '../../src/modules/services/services.service';
import { Service } from '../../src/modules/services/entities/services.entity'; // Ensure the correct path
import { BusinessesService } from '../../src/modules/businesses/businesses.service'; // Add the BusinessesService
import { Business } from '../../src/modules/businesses/entities/business.entity'; // Add Business entity

describe('ServicesResolver (Integration)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let servicesService: ServicesService;
  let businessesService: BusinessesService; // Add the businessesService
  let createdBusiness: Business;
  let createdService: Service;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    servicesService = app.get(ServicesService);
    businessesService = app.get(BusinessesService); // Get BusinessesService
    dataSource = app.get(DataSource);

    console.log('Application initialized and ready for testing.');

    // Create a business entry to be used in the service tests
    const createBusinessInput = {
      business_name: 'Test Business for Service',
      email: 'test@business.com',
      phone_number: '123-456-7890',
      address: '123 Business St, City, Country',
      operating_hours: '9:00 AM - 5:00 PM',
    };

    console.log("Creating business for services tests...");
    createdBusiness = await businessesService.create(createBusinessInput);
    console.log('Created business:', createdBusiness);
  });

  afterAll(async () => {
    await app.close();
    console.log('Application closed after tests.');
  });

  describe('findAllServices', () => {
    it('should return all services', async () => {
      const createServiceInput = {
        service_name: 'Test Service',
        price: 100,
        service_type: 'Type A',
        business_id: createdBusiness.business_id, // Ensure the business_id is provided (adjust as necessary)
      };

      console.log('Creating service...');
      createdService = await servicesService.create(createServiceInput);
      console.log('Created service:', createdService);

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              findAllServices {
                service_id
                service_name
                service_type
                price
                description
              }
            }
          `,
        })
        .expect(200);

      console.log('Response:', response.body);

      expect(response.body.data.findAllServices).toBeDefined();
      expect(response.body.data.findAllServices.length).toBeGreaterThan(0);
      expect(response.body.data.findAllServices[0].service_name).toBe('Test Service');
    });
  });

  describe('findServiceById', () => {
    it('should return a service by ID', async () => {
      const createServiceInput = {
        service_name: 'Another Test Service',
        price: 150,
        service_type: 'Type B',
        business_id: createdBusiness.business_id, // Ensure the business_id is provided (adjust as necessary)
      };

      console.log('Creating service for ID test...');
      const service = await servicesService.create(createServiceInput);
      console.log('Created service:', service);

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              findServiceById(service_id: ${service.service_id}) {
                service_id
                service_name
                service_type
                price
                description
              }
            }
          `,
        })
        .expect(200);

      console.log('Response:', response.body);

      expect(response.body.data.findServiceById).toBeDefined();
      expect(response.body.data.findServiceById.service_name).toBe('Another Test Service');
    });
  });

  
  describe('createService', () => {
    it('should create a new service', async () => {
      const createServiceInput = {
        service_name: 'New Service',
        price: 200,
        service_type: 'Type C',
        business_id: createdBusiness.business_id, // Ensure the business_id is provided (adjust as necessary)
        
      };

      console.log('Creating new service...');
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createService(createServicesInput: {
                service_name: "${createServiceInput.service_name}",
                price: ${createServiceInput.price},
                service_type: "${createServiceInput.service_type}",
                business_id: ${createServiceInput.business_id},
              }) {
                service_id
                service_name
                service_type
                price                
              }
            }
          `,
        })
        .expect(200);

      console.log('Created new service response:', response.body);

      expect(response.body.data.createService).toBeDefined();
      expect(response.body.data.createService.service_name).toBe(createServiceInput.service_name);
    });
  });

  describe('updateService', () => {
    it('should update an existing service', async () => {
      const createServiceInput = {
        service_name: 'Service to Update',
        price: 120,
        service_type: 'Type D',
        business_id: createdBusiness.business_id, // Ensure the business_id is provided (adjust as necessary)

      };

      console.log('Creating service for update...');
      const service = await servicesService.create(createServiceInput);
      console.log('Created service for update:', service);

      const updateServiceInput = {
        service_name: 'Updated Service',
        price: 180,
        service_type: 'Updated Type',
        service_id: service.service_id,
      };

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              updateService(
                updateServicesInput: {     
                    service_id: ${updateServiceInput.service_id},
                    service_name: "${updateServiceInput.service_name}",
                    price: ${updateServiceInput.price},
                    service_type: "${updateServiceInput.service_type}"
                }) {
                    service_id
                    service_name
                    service_type
                    price
                }
            }
          `,
        })
        .expect(200);

      console.log('Updated service response:', response.body);

      expect(response.body.data.updateService).toBeDefined();
      expect(response.body.data.updateService.service_name).toBe(updateServiceInput.service_name);
    });
  });

  describe('deleteServiceById', () => {
    it('should delete a service by ID', async () => {
      const createServiceInput = {
        service_name: 'Service to Delete',
        price: 250,
        service_type: 'Delete Type',
        business_id: createdBusiness.business_id, // Ensure the business_id is provided (adjust as necessary)

      };

      console.log('Creating service for deletion...');
      const service = await servicesService.create(createServiceInput);
      console.log('Created service for deletion:', service);

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              deleteServiceById(service_id: ${service.service_id})
            }
          `,
        })
        .expect(200);

      console.log('Delete service response:', response.body);

      expect(response.body.data.deleteServiceById).toBe(true);

      const deletedService = await dataSource.getRepository(Service).findOne({
        where: { service_id: service.service_id },
      });
      expect(deletedService).toBeNull();
    });
  });


});
