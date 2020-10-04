import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeederModule } from './seeder/seeder.module';
import { BookingModule } from './booking/booking.module';
import { WomenModule } from './women/women.module';
import { ClinicModule } from './clinic/clinic.module';
import { ConsumedMedicationModule } from './consumed-medication/consumed-medication.module';

@Module({
  imports: [SeederModule, BookingModule, WomenModule, ClinicModule, ConsumedMedicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
