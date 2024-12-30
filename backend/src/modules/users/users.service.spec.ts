import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SignupUserInput } from '../auth/dto/signup-user.input';
import { NotFoundException } from '@nestjs/common';

// Mock repository
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockUserRepository = (): MockRepository<User> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;

  const mockUser: User = {
    user_id: 1,
    name: 'non_unique_name',
    username: 'unique_name',
    email: 'testuser@example.com',
    password: 'hashedPassword',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const signupUserInput: SignupUserInput = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        username: 'johnd',
        password: 'password123', // Plaintext password here
      };

      const hashedPassword = 'hashedPassword';

      // Mock bcrypt.hash to return the hashed password
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(hashedPassword as never);

      // Mock repository create method to return the new user
      const newUser = {
        ...signupUserInput,
        password: hashedPassword, // Replace plaintext password with hashed password
      };

      userRepository.create.mockReturnValue(newUser);
      userRepository.save.mockResolvedValue(newUser);

      // Call the method to test
      const result = await service.createUser(signupUserInput);

      // Ensure bcrypt.hash was called with the correct password and saltRounds
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);

      // Ensure the result is correct
      expect(result).toEqual(newUser);

      // Ensure the repository was called with the correct arguments (hashed password)
      
      expect(userRepository.create).toHaveBeenCalledWith({
        ...signupUserInput, // Spread the signup input to include name, email, and username
        password: hashedPassword, // Pass the hashed password here
      });

      // Ensure the save method was called with the new user
      expect(userRepository.save).toHaveBeenCalledWith(newUser);
    });
  });

  describe('findByEmailOrUsername', () => {
    it('should return a user when found', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByEmailOrUsername('testuser');

      // Update the expectation to match the actual query structure
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: [{ email: 'testuser' }, { username: 'testuser' }],
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAllUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers: User[] = [mockUser];
      userRepository.find.mockResolvedValue(mockUsers);

      const result = await service.findAllUsers();

      expect(userRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('updateUser', () => {
    const mockUpdateUserInput = {
      user_id: 1,
      name: 'Updated Name',
      username: 'updated_username',
      email: 'updated@example.com',
    };
  
    it('should successfully update a user', async () => {
      const existingUser = { ...mockUser };
      const expectedUpdatedUser = { 
        ...existingUser,
        ...mockUpdateUserInput 
      };
  
      // Mock finding the existing user
      userRepository.findOne.mockResolvedValue(existingUser);
      // Mock saving the updated user
      userRepository.save.mockResolvedValue(expectedUpdatedUser);
  
      const result = await service.updateUser(mockUpdateUserInput.user_id, mockUpdateUserInput);
  
      // Verify findOne was called with correct parameters
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { user_id: mockUpdateUserInput.user_id },
      });
  
      // Verify save was called with merged user data
      expect(userRepository.save).toHaveBeenCalledWith(expectedUpdatedUser);
  
      // Verify the returned user matches our expectations
      expect(result).toEqual(expectedUpdatedUser);
    });
  
    it('should throw NotFoundException if user not found', async () => {
      const nonExistentUserInput = {
        user_id: 999,
        name: 'Updated Name'
      };
  
      // Mock user not found
      userRepository.findOne.mockResolvedValue(null);
  
      // Verify that attempting to update a non-existent user throws NotFoundException
      await expect(
        service.updateUser(nonExistentUserInput.user_id, nonExistentUserInput)
      ).rejects.toThrow(
        new NotFoundException('User with ID 999 not found')
      );
  
      // Verify findOne was called but save was not
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { user_id: nonExistentUserInput.user_id },
      });
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  
    it('should only update provided fields', async () => {
      const existingUser = { ...mockUser };
      const partialUpdate = {
        user_id: 1,
        name: 'Updated Name'
      };
      const expectedUpdatedUser = { 
        ...existingUser,
        ...partialUpdate 
      };
  
      userRepository.findOne.mockResolvedValue(existingUser);
      userRepository.save.mockResolvedValue(expectedUpdatedUser);
  
      const result = await service.updateUser(partialUpdate.user_id, partialUpdate);
  
      expect(userRepository.save).toHaveBeenCalledWith(expectedUpdatedUser);
      expect(result.name).toBe('Updated Name');
      expect(result.email).toBe(existingUser.email);
      expect(result.username).toBe(existingUser.username);
    });
  });


  describe('remove', () => {
    it('should remove a user if found', async () => {
      // Mocking the userRepository methods
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({ user_id: 1, name: 'Test User' }); // Mock a found user
      jest.spyOn(userRepository, 'delete').mockResolvedValue({ affected: 1 }); // Mock successful deletion

      // Call the service method
      const result = await service.remove(1);

      // Check that findOne was called with the correct argument
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });

      // Check that delete was called with the correct argument
      expect(userRepository.delete).toHaveBeenCalledWith({ user_id: 1 });

      // Optionally, check the result of the remove method
      expect(result).toBeUndefined();
    });

    it('should throw NotFoundException if user not found during removal', async () => {
      // Mocking the userRepository methods
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); // Simulate user not found
      jest.spyOn(userRepository, 'delete').mockResolvedValue({ affected: 0 }); // Simulate deletion failure

      // Call the service method and expect it to throw an error
      await expect(service.remove(1)).rejects.toThrowError(
        new NotFoundException('User with ID 1 not found'),
      );
    });
  });
});
