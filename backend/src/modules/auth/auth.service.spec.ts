import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/users.entity';
import { SignupUserInput } from './dto/signup-user.input';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    // Mock UsersService
    usersService = {
      findByEmailOrUsername: jest.fn(),
      createUser: jest.fn(),
    };

    // Mock JwtService
    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password if credentials are valid', async () => {
      const mockUser = {
        user_id: 1,
        username: 'testuser',
        password: 'hashedpassword',
      } as User;
      jest
        .spyOn(usersService, 'findByEmailOrUsername')
        .mockResolvedValue(mockUser);
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const result = await service.validateUser('testuser', 'password'); // username provided
      expect(result).toEqual({ user_id: 1, username: 'testuser' });

      const resultByEmail = await service.validateUser(
        'testuser@example.com',
        'password',
      ); // email provided
      expect(resultByEmail).toEqual({ user_id: 1, username: 'testuser' });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      jest.spyOn(usersService, 'findByEmailOrUsername').mockResolvedValue(null);

      await expect(
        service.validateUser('testuser', 'password'),
      ).rejects.toThrow(UnauthorizedException);

      await expect(
        service.validateUser('testuser@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      const mockUser = {
        user_id: 1,
        username: 'testuser',
        password: 'hashedpassword',
      } as User;

      jest
        .spyOn(usersService, 'findByEmailOrUsername')
        .mockResolvedValue(mockUser); // Mock the user lookup

      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      // Test when username is provided
      await expect(
        service.validateUser('testuser', 'password'),
      ).rejects.toThrow(UnauthorizedException);

      // Test when email is provided
      await expect(
        service.validateUser('testuser@example.com', 'password'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return an access token and user details', async () => {
      const mockUser = {
        user_id: 1,
        username: 'testuser',
        password: 'hashedpassword',
      } as User;
      const mockToken = 'testtoken';

      // Mock the user lookup
      jest
        .spyOn(usersService, 'findByEmailOrUsername')
        .mockResolvedValue(mockUser);

      // Mock password comparison
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      // Mock JWT token generation
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      // Call the login method
      const result = await service.login(
        mockUser.username,
        'plaintextpassword',
      );

      // Assert the result
      expect(result).toEqual({
        access_token: mockToken,
        user: {
          user_id: mockUser.user_id,
          username: mockUser.username,
        },
      });

      // Verify that sign was called with the correct payload
      expect(jwtService.sign).toHaveBeenCalledWith({
        emailOrUsername: mockUser.username,
        sub: mockUser.user_id,
      });
    });
  });

  describe('signup', () => {
    it('should hash the password and create a new user', async () => {
      const signupInput: SignupUserInput = {
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
        password: 'plaintextpassword',
      };

      const hashedPassword = 'hashedpassword';

      const mockCreatedUser = {
        user_id: 1,
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
        password: hashedPassword, // Ensure the password is hashed here
      };

      const mockToken = 'mockedToken';

      // Mock bcrypt.hash to resolve to the hashed password
      const hashSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue(hashedPassword as never);

      // Mock createUser to return the mock user
      jest
        .spyOn(usersService, 'createUser')
        .mockResolvedValue(mockCreatedUser as any);

      // Mock jwtService.sign
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      // Call the signup method
      const result = await service.signup(signupInput);

      // Ensure bcrypt.hash was called with the correct password and saltRounds
      expect(hashSpy).toHaveBeenCalledWith('plaintextpassword', 10);

      // Ensure the result is correct
      expect(result.access_token).toBe(mockToken);
      expect(result.user.user_id).toBe(mockCreatedUser.user_id);
      expect(result.user.name).toBe(mockCreatedUser.name);
      expect(result.user.username).toBe(mockCreatedUser.username);
      expect(result.user.email).toBe(mockCreatedUser.email);

      // Ensure createUser was called with the correct data, including the hashed password
      expect(usersService.createUser).toHaveBeenCalledWith({
        ...signupInput, // Spread the signup input to include name, email, and username
        password: hashedPassword, // Pass the hashed password here
      });
    });
  });
});
