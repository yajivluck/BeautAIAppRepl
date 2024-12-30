import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail } from 'class-validator';

@InputType()
export class CreateBusinessInput {
  @Field()
  @IsString()
  business_name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  phone_number: string;

  @Field()
  @IsString()
  address: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  operating_hours?: string;
}
