import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { User } from 'src/modules/users/entities/users.entity';
import { SignupUserInput } from 'src/modules/auth/dto/signup-user.input';
import { UpdateUserInput } from 'src/modules/users/dto/update-user.input';
import * as bcrypt from 'bcrypt';

// Mocking the repository
const mockUserRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  merge: jest.fn(),
};

jest.mock('bcrypt', () => ({
  hash: jest
    .fn()
    .mockResolvedValue(
      '$2b$10$c7BucJdNXFcVRGzDL/B6jeaJwsVf.hsRK9P0vxvtjmHWtYElfKYou',
    ),
}));

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const signupUserInput: SignupUserInput = {
        name: 'John Doe',
        username: 'johnd',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const hashedPassword = await bcrypt.hash(signupUserInput.password, 10);
      const newUser = {
        ...signupUserInput,
        password: hashedPassword,
        user_id: 1,
      };

      mockUserRepository.create.mockReturnValue(newUser);
      mockUserRepository.save.mockResolvedValueOnce(newUser);

      const result = await usersService.createUser(signupUserInput);

      expect(result).toEqual(newUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...signupUserInput,
        password: hashedPassword,
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
    });

    it('should throw a ConflictException if email already exists', async () => {
      const signupUserInput: SignupUserInput = {
        name: 'John Doe',
        username: 'johnd',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      mockUserRepository.findOne.mockResolvedValueOnce({
        email: signupUserInput.email,
      });

      await expect(usersService.createUser(signupUserInput)).rejects.toThrow(
        new ConflictException(
          `Email ${signupUserInput.email} is already in use`,
        ),
      );
    });

    it('should throw a ConflictException if username already exists', async () => {
      const signupUserInput: SignupUserInput = {
        name: 'John Doe',
        username: 'johnd',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      mockUserRepository.findOne.mockResolvedValueOnce({
        username: signupUserInput.username,
      });

      await expect(usersService.createUser(signupUserInput)).rejects.toThrow(
        new ConflictException(
          `Username ${signupUserInput.username} is already in use`,
        ),
      );
    });
  });

  describe('findByEmailOrUsername', () => {
    it('should return a user by email or username', async () => {
      const identifier = 'johndoe@example.com';
      const user = { user_id: 1, name: 'John Doe', email: identifier };

      mockUserRepository.findOne.mockResolvedValueOnce(user);

      const result = await usersService.findByEmailOrUsername(identifier);

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: [{ email: identifier }, { username: identifier }],
      });
    });

    it('should return null if no user is found', async () => {
      const identifier = 'unknown@example.com';

      mockUserRepository.findOne.mockResolvedValueOnce(null);

      const result = await usersService.findByEmailOrUsername(identifier);

      expect(result).toBeNull();
    });
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const users = [
        { user_id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { user_id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
      ];

      mockUserRepository.find.mockResolvedValueOnce(users);

      const result = await usersService.findAllUsers();

      expect(result).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const userId = 1;
      const user = {
        user_id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com',
      };

      mockUserRepository.findOne.mockResolvedValueOnce(user);
      mockUserRepository.delete.mockResolvedValueOnce({ affected: 1 });

      await usersService.remove(userId);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
      expect(mockUserRepository.delete).toHaveBeenCalledWith({
        user_id: userId,
      });
    });

    it('should throw a NotFoundException if user not found', async () => {
      const userId = 1;

      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(usersService.remove(userId)).rejects.toThrow(
        new NotFoundException(`User with ID ${userId} not found`),
      );
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const userId = 1;
      const updateUserInput: UpdateUserInput = {
        user_id: userId,
        name: 'Updated Name',
        username: 'updateduser',
        email: 'updatedemail@example.com',
      };

      const existingUser = {
        user_id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com',
        username: 'johnd',
      };

      mockUserRepository.findOne.mockResolvedValueOnce(existingUser);

      const updatedUser = { ...existingUser, ...updateUserInput };
      mockUserRepository.save.mockResolvedValueOnce(updatedUser);

      const result = await usersService.updateUser(userId, updateUserInput);

      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { user_id: userId },
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(updatedUser);
    });

    it('should throw a NotFoundException if the user to update does not exist', async () => {
      const userId = 1;
      const updateUserInput: UpdateUserInput = {
        user_id: userId,
        name: 'Updated Name',
        username: 'updateduser',
        email: 'updatedemail@example.com',
      };

      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(
        usersService.updateUser(userId, updateUserInput),
      ).rejects.toThrow(
        new NotFoundException(`User with ID ${userId} not found`),
      );
    });
  });
});
