import { PetsService } from './pets.service';
import { Module } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';
import { Pet } from './pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), OwnersModule],
  controllers: [],
  providers: [PetsService, PetsResolver],
})
export class PetsModule {}
