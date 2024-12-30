import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BusinessesService } from './businesses.service';
import { Business } from './entities/business.entity';
import { CreateBusinessInput } from './dto/create-business.input';
import { UpdateBusinessInput } from './dto/update-business.input';

@Resolver(() => Business)
export class BusinessesResolver {
  constructor(private readonly businessesService: BusinessesService) {}

  // Query to fetch all businesses
  @Query(() => [Business], { name: 'getAllBusinesses' })
  findAllBusinesses(): Promise<Business[]> {
    return this.businessesService.findAll();
  }

  // Query to fetch a single business by provider_id
  @Query(() => Business, { name: 'getBusinessById' })
  findBusinessById(@Args('business_id', { type: () => Int }) business_id: number): Promise<Business> {
    return this.businessesService.findOne(business_id);
  }
  
  // Mutation to create a new business
  @Mutation(() => Business, { name: 'createNewBusiness' })
  createBusiness(
    @Args('createBusinessInput') createBusinessInput: CreateBusinessInput,
  ): Promise<Business> {
    return this.businessesService.create(createBusinessInput);
  }

  // Mutation to update an existing business
  @Mutation(() => Business, { name: 'updateExistingBusiness' })
  async updateBusiness(
    @Args('business_id', { type: () => Int }) business_id: number,  // Receive provider_id directly from args
    @Args('updateBusinessInput') updateBusinessInput: UpdateBusinessInput,
  ): Promise<Business> {
    return this.businessesService.update(business_id, updateBusinessInput);
  }

  // Mutation to delete a business by provider_id
  @Mutation(() => Boolean, { name: 'deleteBusinessById' })
  async deleteBusiness(
    @Args('business_id', { type: () => Int }) business_id: number,
  ): Promise<boolean> {
    return this.businessesService.delete(business_id);
  }
}
