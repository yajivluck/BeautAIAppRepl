import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Matches, IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateServicesInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  service_name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  service_description?: string;

  @Field(() => Float)
  @IsNumber()
  price: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  service_type: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  business_id: number;  // Only the business ID is needed for the relationship
}
