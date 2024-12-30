import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { SignupUserInput } from '../auth/dto/signup-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   */
  async createUser(signupUserInput: SignupUserInput): Promise<User> {
    const { name, email, username, password } = signupUserInput;

    // Check if the username or email already exists
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { username }],
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException(`Email ${email} is already in use`);
      }
      if (existingUser.username === username) {
        throw new ConflictException(`Username ${username} is already in use`);
      }
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user with the hashed password
    const newUser = this.userRepository.create({
      name,
      email,
      username,
      password: hashedPassword, // Use the hashed password here

    });

    return this.userRepository.save(newUser);
  }

  /**
   * Find a user by email or username
   */

  async findByEmailOrUsername(identifier: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: [{ email: identifier }, { username: identifier }],
    });
    return user;
  }

  /**
   * Retrieve all users
   */
  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(
    userId: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    // Find the existing user by ID
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    // If user does not exist, throw a NotFoundException
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Update the user's details
    const updatedUser = Object.assign(user, updateUserInput);

    // Save the updated user
    return this.userRepository.save(updatedUser);
  }

  /**
   * Remove a user by ID
   */
  async remove(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    await this.userRepository.delete({ user_id: userId });
  }
}
