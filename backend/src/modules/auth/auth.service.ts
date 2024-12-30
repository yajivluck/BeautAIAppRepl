import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupUserInput } from './dto/signup-user.input';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    identifier: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.usersService.findByEmailOrUsername(identifier);
    if (!user) {
      throw new UnauthorizedException('Invalid email/username or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email/username or password.');
    }

    // Exclude the password from the returned user object
    const { password: _, ...result } = user;
    return result as User;
  }

  async login(identifier: string, password: string): Promise<LoginResponse> {
    const user = await this.validateUser(identifier, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email/username or password.');
    }

    const payload = {
      emailOrUsername: user.email || user.username,
      sub: user.user_id,
    };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user,
    };
  }

  async signup(signupUserInput: SignupUserInput): Promise<LoginResponse> {
    const existingUser = await this.usersService.findByEmailOrUsername(
      signupUserInput.email || signupUserInput.username,
    );

    if (existingUser) {
      throw new UnauthorizedException('Email or username is already in use.');
    }

    if (!signupUserInput.email && !signupUserInput.username) {
      throw new UnauthorizedException(
        'Email or username is required for signup.',
      );
    }

    if (!signupUserInput.password) {
      throw new UnauthorizedException('Password is required for signup.');
    }

    if (!signupUserInput.name) {
      throw new UnauthorizedException('Name is required for signup.');
    }

    if (!signupUserInput.username) {
      signupUserInput.username = signupUserInput.email;
    } else if (!signupUserInput.email) {
      signupUserInput.email = signupUserInput.username;
    }

    const hashedPassword = await bcrypt.hash(signupUserInput.password, 10);

    const user = await this.usersService.createUser({
      ...signupUserInput,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({
      emailOrUsername: user.email || user.username,
      sub: user.user_id,
    });

    return {
      access_token: token,
      user,
    };
  }
}
