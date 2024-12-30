import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { SignupUserInput } from '../auth/dto/signup-user.input';
import { ExecutionContext } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Mocked service and guards
const mockUsersService = {
  createUser: jest.fn(),
  findAllUsers: jest.fn(),  // Corrected method name here
  findByEmailOrUsername: jest.fn(),
  updateUser: jest.fn(),
  remove: jest.fn(),
};

const mockUser = {
  id: 1,
  name: 'non_unique_name',
  username: 'testuser',
  password: 'hashedpassword',
  email: 'testuser@example.com',
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        JwtAuthGuard,
        GqlAuthGuard,
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const signupInput: SignupUserInput = {
        name: 'non_unique_name',
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password',
      };
      mockUsersService.createUser.mockResolvedValue(mockUser);

      const result = await resolver.createUser(signupInput);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(signupInput);
    });
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      mockUsersService.findAllUsers.mockResolvedValue([mockUser]);

      const result = await resolver.findAllUsers();

      expect(result).toEqual([mockUser]);
      expect(mockUsersService.findAllUsers).toHaveBeenCalled();
    });
  });

  describe('findByEmailOrUsername', () => {
    it('should return a user by username', async () => {
      mockUsersService.findByEmailOrUsername.mockResolvedValue(mockUser);
      
      const result = await resolver.findByEmailOrUsername('testuser');

      expect(result).toEqual(mockUser);
      expect(mockUsersService.findByEmailOrUsername).toHaveBeenCalledWith('testuser');
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const id = 1;
      const updateUserInput = {
        user_id: 1,
        name: 'Updated Name',
        username: 'updated_username',
        email: 'updated@example.com',
      };
  
      const updatedUser = {
        ...mockUser,
        ...updateUserInput,
      };
  
      // Mock the service method
      mockUsersService.updateUser = jest.fn().mockResolvedValue(updatedUser);
  
      const result = await resolver.updateUser(id, updateUserInput);
  
      expect(result).toEqual(updatedUser);
      expect(mockUsersService.updateUser).toHaveBeenCalledWith(id, updateUserInput);
    });
  
    it('should throw NotFoundException when user is not found', async () => {
      const id = 999;
      const updateUserInput = {
        user_id: 999,
        name: 'Updated Name',
      };
  
      // Mock the service method to return null
      mockUsersService.updateUser = jest.fn().mockResolvedValue(null);
  
      // Verify that attempting to update a non-existent user throws NotFoundException
      await expect(resolver.updateUser(id, updateUserInput)).rejects.toThrow(
        `User with ID "${id}" not found`
      );
  
      expect(mockUsersService.updateUser).toHaveBeenCalledWith(id, updateUserInput);
    });
  
    it('should handle partial updates', async () => {
      const id = 1;
      const updateUserInput = {
        user_id: 1,
        name: 'Updated Name',
      };
  
      const updatedUser = {
        ...mockUser,
        name: 'Updated Name',
      };
  
      // Mock the service method
      mockUsersService.updateUser = jest.fn().mockResolvedValue(updatedUser);
  
      const result = await resolver.updateUser(id, updateUserInput);
  
      expect(result).toEqual(updatedUser);
      expect(mockUsersService.updateUser).toHaveBeenCalledWith(id, updateUserInput);
      expect(result.name).toBe('Updated Name');
      expect(result.email).toBe(mockUser.email); // Original email should be preserved
      expect(result.username).toBe(mockUser.username); // Original username should be preserved
    });
  });

  describe('removeUser', () => {
    it('should remove a user by ID and return true', async () => {
      mockUsersService.remove.mockResolvedValue(undefined);

      const result = await resolver.removeUser(1);

      expect(result).toBe(true);
      expect(mockUsersService.remove).toHaveBeenCalledWith(1);
    });

    it('should return false if user removal fails', async () => {
      mockUsersService.remove.mockRejectedValue(
        new Error('Failed to remove user'),
      );

      const result = await resolver.removeUser(1);

      expect(result).toBe(false);
      expect(mockUsersService.remove).toHaveBeenCalledWith(1);
    });
  });
});
