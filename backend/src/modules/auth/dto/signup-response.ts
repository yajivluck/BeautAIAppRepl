import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignupResponse {
  @Field()
  user_id: number;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
