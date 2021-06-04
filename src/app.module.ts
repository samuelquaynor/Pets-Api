import { PetsModule } from './pets/pets.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PetsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'Millions$22',
      port: 5432,
      host: '127.0.0.1',
      database: 'invoiceapp',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
