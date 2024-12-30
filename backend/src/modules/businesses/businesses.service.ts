import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './entities/business.entity';
import { CreateBusinessInput } from './dto/create-business.input';
import { UpdateBusinessInput } from './dto/update-business.input';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  // Create a new business
  async create(createBusinessInput: CreateBusinessInput): Promise<Business> {
    const newBusiness = this.businessRepository.create(createBusinessInput);
    return await this.businessRepository.save(newBusiness);
  }


  
  // Retrieve all businesses
  async findAll(): Promise<Business[]> {
    return this.businessRepository.find();
  }

  // Retrieve a business by its ID
  async findOne(business_id: number): Promise<Business> {
    try {
      return await this.businessRepository.findOneOrFail({ where: { business_id } });
    } catch (error) {
      throw new NotFoundException(`Business with ID ${business_id} not found.`);
    }
  }

  // Update a business by its ID
  async update(business_id: number, updateBusinessInput: UpdateBusinessInput): Promise<Business> {
    const business = await this.businessRepository.findOne({ where: { business_id } });

    if (!business) {
      throw new NotFoundException(`Business with ID ${business_id} not found.`);
    }

    Object.assign(business, updateBusinessInput); // Update the business with the new data
    return this.businessRepository.save(business); // Save the updated business
  }

  // Delete a business by its ID
  async delete(business_id: number): Promise<boolean> {
    const result = await this.businessRepository.delete(business_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Business with ID ${business_id} not found.`);
    }
    return true; // Return true if the deletion was successful
  }
}
