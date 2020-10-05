import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { WomenModule } from '../women/women.module';
import { ClinicModule } from '../clinic/clinic.module';
import { Booking } from './booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    WomenModule,
    ClinicModule
  ],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingModule { }
