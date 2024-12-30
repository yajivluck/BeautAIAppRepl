import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateUserDto } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserDto) {
  @Field()
  user_id: number;
}
