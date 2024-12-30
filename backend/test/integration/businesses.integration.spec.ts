import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'; // Main app module
import { DataSource } from 'typeorm';
import { BusinessesService } from '../../src/modules/businesses/businesses.service';
import { Business } from '../../src/modules/businesses/entities/business.entity'; // Ensure the correct path

describe('BusinessesResolver (Integration)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let businessesService: BusinessesService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    businessesService = app.get(BusinessesService);
    dataSource = app.get(DataSource);
    console.log('Application initialized and ready for testing.');
  });

  afterAll(async () => {
    await app.close();
    console.log('Application closed after tests.');
  });

  describe('getAllBusinesses', () => {
    it('should return all businesses', async () => {
      const createBusinessInput = {
        business_name: 'Test Business',
        email: 'test@business.com',
        phone_number: '123-456-7890',
        address: '123 Business St, City, Country',
        operating_hours: '9:00 AM - 5:00 PM',
      };

      console.log('Creating business...');
      const business = await businessesService.create(createBusinessInput);
      console.log('Created business:', business);
      console.log('Fetching business by ID...');

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              getAllBusinesses {
                business_id
                business_name
                email
                phone_number
                address
                operating_hours
              }
            }
          `,
        })
        .expect(200);

      console.log('Response:', response.body);

      expect(response.body.data.getAllBusinesses).toBeDefined();
      expect(response.body.data.getAllBusinesses.length).toBeGreaterThan(0);
      expect(response.body.data.getAllBusinesses[0].business_name).toBe(
        'Test Business',
      );
    });
  });

  describe('getBusinessById', () => {
    it('should return a business by ID', async () => {
      const createBusinessInput = {
        business_name: 'Another Test Business',
        email: 'another@business.com',
        phone_number: '987-654-3210',
        address: '456 Business Ave, City, Country',
        operating_hours: '10:00 AM - 6:00 PM',
      };

      console.log('Creating business for ID test...');
      const business = await businessesService.create(createBusinessInput);
      console.log('Created business:', business);

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            query {
              getBusinessById(business_id: ${business.business_id}) {
                business_id
                business_name
                email
                phone_number
                address
                operating_hours
              }
            }
          `,
        })
        .expect(200);

      console.log('Response:', response.body);

      expect(response.body.data.getBusinessById).toBeDefined();
      expect(response.body.data.getBusinessById.business_name).toBe(
        'Another Test Business',
      );
    });
  });

  describe('createNewBusiness', () => {
    it('should create a new business', async () => {
      const createBusinessInput = {
        business_name: 'New Business',
        email: 'new@business.com',
        phone_number: '321-654-9870',
        address: '789 Business Rd, City, Country',
        operating_hours: '8:00 AM - 4:00 PM',
      };

      console.log('Creating new business...');
      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              createNewBusiness(createBusinessInput: {
                business_name: "${createBusinessInput.business_name}",
                email: "${createBusinessInput.email}",
                phone_number: "${createBusinessInput.phone_number}",
                address: "${createBusinessInput.address}",
                operating_hours: "${createBusinessInput.operating_hours}"
              }) {
                business_id
                business_name
                email
                phone_number
                address
                operating_hours
              }
            }
          `,
        })
        .expect(200);

      console.log('Created new business response:', response.body);

      expect(response.body.data.createNewBusiness).toBeDefined();
      expect(response.body.data.createNewBusiness.business_name).toBe(
        createBusinessInput.business_name,
      );
    });
  });

  describe('updateExistingBusiness', () => {
    it('should update an existing business', async () => {
      const createBusinessInput = {
        business_name: 'Business to Update',
        email: 'update@business.com',
        phone_number: '555-123-4567',
        address: '101 Update St, City, Country',
        operating_hours: '7:00 AM - 3:00 PM',
      };

      console.log('Creating business for update...');
      const business = await businessesService.create(createBusinessInput);
      console.log('Created business for update:', business);

      const updateBusinessInput = {
        business_name: 'Updated Business',
        email: 'updated@business.com',
        phone_number: '555-765-4321',
        address: '202 Updated Rd, City, Country',
        operating_hours: '9:00 AM - 5:00 PM',
      };

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              updateExistingBusiness(business_id: ${business.business_id}, updateBusinessInput: {
                business_name: "${updateBusinessInput.business_name}",
                email: "${updateBusinessInput.email}",
                phone_number: "${updateBusinessInput.phone_number}",
                address: "${updateBusinessInput.address}",
                operating_hours: "${updateBusinessInput.operating_hours}"
              }) {
                business_id
                business_name
                email
                phone_number
                address
                operating_hours
              }
            }
          `,
        })
        .expect(200);

      console.log('Updated business response:', response.body);

      expect(response.body.data.updateExistingBusiness).toBeDefined();
      expect(response.body.data.updateExistingBusiness.business_name).toBe(
        updateBusinessInput.business_name,
      );
    });
  });

  describe('deleteBusinessById', () => {
    it('should delete a business by ID', async () => {
      const createBusinessInput = {
        business_name: 'Business to Delete',
        email: 'delete@business.com',
        phone_number: '555-987-6543',
        address: '303 Delete St, City, Country',
        operating_hours: '10:00 AM - 6:00 PM',
      };

      console.log('Creating business for deletion...');
      const business = await businessesService.create(createBusinessInput);
      console.log('Created business for deletion:', business);

      const response = await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
            mutation {
              deleteBusinessById(business_id: ${business.business_id})
            }
          `,
        })
        .expect(200);

      console.log('Delete business response:', response.body);

      expect(response.body.data.deleteBusinessById).toBe(true);

      const deletedBusiness = await dataSource.getRepository(Business).findOne({
        where: { business_id: business.business_id },
      });
      expect(deletedBusiness).toBeNull();
    });
  });
});
