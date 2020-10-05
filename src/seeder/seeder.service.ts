import { Injectable } from '@nestjs/common';
import { BookingService } from '../booking/booking.service';
import * as csv from 'csvtojson';
import { BookingCSV } from './interfaces/booking-csv';
import { ExplorationCSV } from './interfaces/exploration-csv';
import { ConsumedMedicationService } from '../consumed-medication/consumed-medication.service';

@Injectable()
export class SeederService {
    constructor(
        private bookingService: BookingService,
        private consumedMedicationService: ConsumedMedicationService,
    ) { }

    async seedBookings(): Promise<boolean> {
        console.log('Saving data from bookings.csv...')
        const bookingsActuallySaved = await this.bookingService.count();
        if (bookingsActuallySaved < 1) {
            const csvFilePath = `/app/public/bookings.csv`;
            const bookingsCSV: BookingCSV[] = await csv().fromFile(csvFilePath);

            for await (const bookingCSV of bookingsCSV) {
                await this.bookingService.insert({
                    bookingId: Number(bookingCSV.id),
                    clinicName: bookingCSV.clinicName,
                    dateTime: bookingCSV.datetime,
                    womenEmail: bookingCSV.email,
                    womenName: bookingCSV.name
                })
            }
            console.log('Data Saved from bookings.csv');

        } else {
            console.log('Have been save the bookings from CSV file');
        }

        return true;
    }

    async seedExplorations(): Promise<boolean> {
        console.log('Saving data from explorations.csv...')
        const consumedMedicationsActuallySaved = await this.consumedMedicationService.count();
        if (consumedMedicationsActuallySaved < 1) {
            const csvFilePath = `/app/public/explorations.csv`
            const explorationsCSV: ExplorationCSV[] = await csv().fromFile(csvFilePath);

            for await (const explorationCSV of explorationsCSV) {
                await this.consumedMedicationService.insert({
                    bookingId: Number(explorationCSV.bookingId),
                    consumedMedications: explorationCSV.consumedMedications,
                })
            }
            console.log('Data saved from bookings.csv');
        } else {
            console.log('Have been save the consumed medications from CSV file');
        }
        return true;
    }

}
