import { Module } from '@nestjs/common';
import { ConsumedMedicationModule } from 'src/consumed-medication/consumed-medication.module';
import { BookingModule } from '../booking/booking.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [BookingModule, ConsumedMedicationModule],
  providers: [SeederService],
  exports: [SeederService]
})
export class SeederModule { }
