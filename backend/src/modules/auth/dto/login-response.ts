import { Field, ObjectType } from '@nestjs/graphql';
import { SignupResponse } from './signup-response';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => SignupResponse)
  user: SignupResponse;
}
