import { Module } from '@nestjs/common';
import { ConsumedMedicationService } from './consumed-medication.service';

@Module({
  providers: [ConsumedMedicationService]
})
export class ConsumedMedicationModule { }
