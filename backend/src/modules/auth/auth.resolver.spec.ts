import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { SignupUserInput } from './dto/signup-user.input';
import { User } from '../users/entities/users.entity';
import { LoginResponse } from './dto/login-response';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: Partial<AuthService>;

  beforeEach(async () => {
    authService = {
      validateUser: jest.fn(),
      login: jest.fn(),
      signup: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('login', () => {
    it('should return a LoginResponse if credentials are valid with email', async () => {
      const mockUser = {
        user_id: 1,
        name: 'testuser',
        email: 'testuser@gmail.com',
      } as User;
      const mockLoginResponse = {
        access_token: 'testtoken',
        user: mockUser,
      } as LoginResponse;

      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);
      jest.spyOn(authService, 'login').mockResolvedValue(mockLoginResponse);

      const loginUserInput: LoginUserInput = {
        emailOrUsername: 'testuser@gmail.com', // Test with email
        password: 'password',
      };

      const result = await resolver.login(loginUserInput);
      expect(result).toEqual(mockLoginResponse);

      // Now expect validateUser to be called with the full email
      expect(authService.validateUser).toHaveBeenCalledWith(
        'testuser@gmail.com', // Match the full email
        'password',
      );
      // Expect login to be called with the email and password, not the user object
      expect(authService.login).toHaveBeenCalledWith(
        'testuser@gmail.com', // Email as identifier
        'password', // Password
      );
    });

    it('should return a LoginResponse if credentials are valid with username', async () => {
      const mockUser = {
        user_id: 1,
        name: 'testuser',
        username: 'testuser',
      } as User;
      const mockLoginResponse = {
        access_token: 'testtoken',
        user: mockUser,
      } as LoginResponse;

      jest.spyOn(authService, 'validateUser').mockResolvedValue(mockUser);
      jest.spyOn(authService, 'login').mockResolvedValue(mockLoginResponse);

      const loginUserInput: LoginUserInput = {
        emailOrUsername: 'testuser', // Test with username
        password: 'password',
      };

      const result = await resolver.login(loginUserInput);
      expect(result).toEqual(mockLoginResponse);

      // Now expect validateUser to be called with the username
      expect(authService.validateUser).toHaveBeenCalledWith(
        'testuser', // Match the username
        'password',
      );
      // Expect login to be called with the username and password, not the user object
      expect(authService.login).toHaveBeenCalledWith(
        'testuser', // Username as identifier
        'password', // Password
      );
    });

    it('should throw an error if credentials are invalid', async () => {
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      const loginUserInput: LoginUserInput = {
        emailOrUsername: 'testuser@gmail.com',
        password: 'wrongpassword',
      };

      await expect(resolver.login(loginUserInput)).rejects.toThrow(
        'Invalid email/username or password',
      );
      expect(authService.validateUser).toHaveBeenCalledWith(
        'testuser@gmail.com', // Check with email
        'wrongpassword',
      );
    });
  });

  describe('signup', () => {
    it('should return the created user with an access token', async () => {
      const mockSignupInput: SignupUserInput = {
        name: 'non_unique_name',
        username: 'unique_name',
        email: 'newuser@example.com',
        password: 'securepassword',
      };

      const mockUser = {
        user_id: 2,
        name: 'newuser',
        email: 'newuser@example.com',
        password: 'hashedpassword', // Include the hashed password (just for the test)
      } as User;

      const mockToken = 'testtoken'; // Mock the token

      // Mock the service to return AuthPayload (which includes both token and user)
      jest.spyOn(authService, 'signup').mockResolvedValue({
        access_token: mockToken,
        user: mockUser,
      });

      const result = await resolver.signup(mockSignupInput);

      // Assert that the result matches the expected AuthPayload
      expect(result).toEqual({
        access_token: mockToken,
        user: mockUser,
      });

      // Verify that the signup method was called with the correct input
      expect(authService.signup).toHaveBeenCalledWith(mockSignupInput);
    });
  });
});
