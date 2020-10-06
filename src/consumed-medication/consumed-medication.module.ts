import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from 'src/booking/booking.module';
import { ConsumedMedication } from './consumed-medication.entity';
import { ConsumedMedicationService } from './consumed-medication.service';
import { ConsumedMedicationController } from './consumed-medication.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsumedMedication]),
    BookingModule
  ],
  providers: [ConsumedMedicationService],
  exports: [ConsumedMedicationService],
  controllers: [ConsumedMedicationController],
})
export class ConsumedMedicationModule { }
