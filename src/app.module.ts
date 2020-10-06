import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederModule } from './seeder/seeder.module';
import { BookingModule } from './booking/booking.module';
import { WomenModule } from './women/women.module';
import { ClinicModule } from './clinic/clinic.module';
import { ConsumedMedicationModule } from './consumed-medication/consumed-medication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'root',
      password: 'SuperSecretPassword',
      database: 'eva-fullstack-challenge',
      synchronize: true,
      autoLoadEntities: true,
    }),
    SeederModule,
    BookingModule,
    WomenModule,
    ClinicModule,
    ConsumedMedicationModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
