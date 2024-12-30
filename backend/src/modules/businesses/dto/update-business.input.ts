import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateBusinessInput {
  @Field({ nullable: true })
  business_name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone_number?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  operating_hours?: string;
}
