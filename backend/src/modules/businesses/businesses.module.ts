import { Module } from '@nestjs/common';
import { BusinessesService } from './businesses.service';
import { BusinessesResolver } from './businesses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './entities/business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  providers: [BusinessesResolver, BusinessesService],
  exports: [BusinessesService],
})
export class BusinessModule {}
