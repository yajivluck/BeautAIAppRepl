import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { SignupUserInput } from './dto/signup-user.input';
import { LoginResponse } from './dto/login-response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  /**
   * Mutation to handle user login
   */
  @Mutation(() => LoginResponse)
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginResponse> {
    const user = await this.authService.validateUser(
      loginUserInput.emailOrUsername,
      loginUserInput.password,
    );

    if (!user) {
      throw new Error('Invalid email/username or password.');
    }

    return this.authService.login(
      loginUserInput.emailOrUsername,
      loginUserInput.password,
    );
  }

  /**
   * Mutation to handle user signup
   */
  @Mutation(() => LoginResponse)
  async signup(
    @Args('signupUserInput') signupUserInput: SignupUserInput,
  ): Promise<LoginResponse> {
    return this.authService.signup(signupUserInput);
  }
}
