import { Module } from '@nestjs/common';
import { BookingModule } from '../booking/booking.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [BookingModule],
  providers: [SeederService],
  exports: [SeederService]
})
export class SeederModule { }
