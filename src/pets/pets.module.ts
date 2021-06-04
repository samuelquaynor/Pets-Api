import { PetsService } from './pets.service';
import { forwardRef, Module } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';
import { Pet } from './pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from 'src/owners/owners.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), forwardRef(() => OwnersModule)],
  controllers: [],
  providers: [PetsService, PetsResolver],
  exports: [PetsService],
})
export class PetsModule {}
