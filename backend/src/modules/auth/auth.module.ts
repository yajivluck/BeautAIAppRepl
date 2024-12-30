import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local-strategy';
import { AuthResolver } from './auth.resolver';
import { GqlAuthGuard } from './gql-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({
      secret: 'defaultSecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    // LocalStrategy,
    GqlAuthGuard,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
