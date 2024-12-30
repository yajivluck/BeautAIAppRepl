import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Service } from './entities/services.entity'; // Note: Use 'Service' as per your model
import { CreateServicesInput } from './dto/create-services.input';
import { UpdateServicesInput } from './dto/update-services.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Service) // Updated to match the entity name 'Service'
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  // Create a new service
  @Mutation(() => Service)
  createService(
    @Args('createServicesInput') createServicesInput: CreateServicesInput,
  ): Promise<Service> {
    return this.servicesService.create(createServicesInput);
  }

  // Retrieves all services
  @Query(() => [Service], { name: 'findAllServices' })
  findAllServices(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  // Retrieves a specific service by its ID
  @Query(() => Service, { name: 'findServiceById' })
  findServiceById(
    @Args('service_id', { type: () => Int }) service_id: number,
  ): Promise<Service> {
    return this.servicesService.findOne(service_id);
  }

  // Update an existing service
  @Mutation(() => Service)
  updateService(
    @Args('updateServicesInput') updateServicesInput: UpdateServicesInput,
  ): Promise<Service> {
    return this.servicesService.update(updateServicesInput);
  }

  // Remove a service
  @Mutation(() => Boolean)
  async removeService(
    @Args('service_id', { type: () => Int }) service_id: number,
  ): Promise<boolean> {
    const result = await this.servicesService.remove(service_id);

    if (!result) {
      throw new NotFoundException(`Service with ID ${service_id} not found`);
    }

    return result;
  }

  // Delete a service by its ID (new resolver)
  @Mutation(() => Boolean)
  async deleteServiceById(
    @Args('service_id', { type: () => Int }) service_id: number,
  ): Promise<boolean> {
    const result = await this.servicesService.remove(service_id);

    if (!result) {
      throw new NotFoundException(`Service with ID ${service_id} not found`);
    }

    return result;
  }
}
