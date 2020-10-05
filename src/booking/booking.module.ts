import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { WomenModule } from '../women/women.module';
import { ClinicModule } from '../clinic/clinic.module';

@Module({
  imports: [WomenModule, ClinicModule],
  providers: [BookingService],
  controllers: [BookingController]
})
export class BookingModule { }
