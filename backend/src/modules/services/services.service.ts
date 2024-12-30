import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/services.entity';
import { CreateServicesInput } from './dto/create-services.input';
import { UpdateServicesInput } from './dto/update-services.input';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  // Create a new service
  async create(createServicesInput: CreateServicesInput): Promise<Service> {
    const newService = this.servicesRepository.create(createServicesInput);
    return await this.servicesRepository.save(newService);
  }

  // Get all services
  async findAll(): Promise<Service[]> {
    return await this.servicesRepository.find();
  }

  // Find a service by its ID
  async findOne(service_id: number): Promise<Service> {
    try {
      return await this.servicesRepository.findOneOrFail({ where: { service_id } });
    } catch (error) {
      throw new NotFoundException(`Service with ID ${service_id} not found.`);
    }
  }

  // Update an existing service
  async update(updateServicesInput: UpdateServicesInput): Promise<Service> {
    const { service_id, ...updateData } = updateServicesInput;
    // Ensure the service exists before updating
    const service = await this.findOne(service_id);

    Object.assign(service, updateData);  // Merge the new data into the existing service
    return await this.servicesRepository.save(service);  // Save and return the updated service
  }

  // Remove a service by its ID
  async remove(service_id: number): Promise<boolean> {
    const result = await this.servicesRepository.delete(service_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with ID ${service_id} not found.`);
    }
    return true;
  }
}
