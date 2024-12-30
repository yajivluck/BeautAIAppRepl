import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { SignupUserInput } from '../auth/dto/signup-user.input';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // Mutation: Create a new user
  @Mutation(() => User)
  async createUser(
    @Args('signupUserInput') signupUserInput: SignupUserInput,
  ): Promise<User> {
    return this.usersService.createUser(signupUserInput);
  }

  // Query: Get all users (Protected Route)
  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'users' })
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  // Query: Get a user by username or email

  @Query(() => User, { name: 'user' })
  async findByEmailOrUsername(
    @Args('identifier', { type: () => String }) identifier: string,
  ): Promise<User> {
    if (!identifier) {
      throw new NotFoundException(
        'An identifier (email or username) must be provided',
      );
    }

    const user = await this.usersService.findByEmailOrUsername(identifier);

    if (!user) {
      throw new NotFoundException(
        `User with identifier "${identifier}" not found`,
      );
    }

    return user;
  }

  // Mutation: Update a user by ID
  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    const updatedUser = await this.usersService.updateUser(id, updateUserInput);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return updatedUser;
  }
  
  
  // Mutation: Delete a user by ID (Protected Route)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    try {
      await this.usersService.remove(id);
      return true;
    } catch {
      return false;
    }
  }
}
