import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServicesResolver, ServicesService],
  exports: [ServicesService, TypeOrmModule], // Export TypeOrmModule
})
export class ServicesModule {}
