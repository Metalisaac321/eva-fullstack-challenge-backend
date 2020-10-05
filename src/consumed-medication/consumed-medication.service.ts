
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingService } from '../booking/booking.service';
import { Repository } from 'typeorm';
import { ConsumedMedication } from './consumed-medication.entity';
import { InsertConsumedMedicationDto } from './dto/insert-consumed-medication.dto';

@Injectable()
export class ConsumedMedicationService {
    constructor(
        @InjectRepository(ConsumedMedication)
        private consumedMedicationRepository: Repository<ConsumedMedication>,
        private bookingService: BookingService,
    ) { }

    /**
     * Function that receive the bookingId and consumedMedications from CSV file and save the information in db.
     * 
     */
    async insert({ bookingId, consumedMedications }: InsertConsumedMedicationDto): Promise<any> {
        const booking = await this.bookingService.findById(bookingId);

        if (booking) {
            const consumedMedicationsArray: ConsumedMedication[] = [];

            for await (const consumedMedicationName of JSON.parse(consumedMedications)) {
                const consumedMedication = await this.save(consumedMedicationName);
                consumedMedicationsArray.push(consumedMedication);
            }
            booking.consumedMedications = consumedMedicationsArray;
            return await this.bookingService.save(booking)
        }

        return booking;
    }

    async save(name: string) {
        let consumedMedication: ConsumedMedication;
        consumedMedication = await this.consumedMedicationRepository.findOne({
            name,
        })

        if (!consumedMedication) {
            consumedMedication = await this.consumedMedicationRepository.save({
                name: name,
            });
        }

        return consumedMedication;
    }

    async count(): Promise<number> {
        return await this.consumedMedicationRepository.count()
    }
}
