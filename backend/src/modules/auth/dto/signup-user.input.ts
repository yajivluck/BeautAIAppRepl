import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

@InputType()
export class SignupUserInput {
  @Field()
  @IsString()
  @MinLength(1, { message: 'Name must be at least 1 character long.' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @Field()
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long.' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores.',
  })
  username: string;

  @Field()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}
