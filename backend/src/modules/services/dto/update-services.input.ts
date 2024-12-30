import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateServicesInput } from './create-services.input';

@InputType()
export class UpdateServicesInput extends PartialType(CreateServicesInput) {
  @Field()
  service_id: number;  // Required to identify which service to update
}
