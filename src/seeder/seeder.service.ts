import { Injectable } from '@nestjs/common';
import { BookingService } from '../booking/booking.service';
import * as csv from 'csvtojson';
import { BookingCSV } from './interfaces/booking-csv';
import { ExplorationCSV } from './interfaces/exploration-csv';

@Injectable()
export class SeederService {
    constructor(
        private bookingService: BookingService
    ) { }

    async seedBookings(): Promise<boolean> {
        const csvFilePath = `${__dirname}/bookings.csv`
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

        return true;
    }

    async seedExplorations(): Promise<boolean> {
        const csvFilePath = `${__dirname}/explorations.csv`
        const explorationsCSV: ExplorationCSV[] = await csv().fromFile(csvFilePath);

        /*  for await (const explorationCSV of explorationsCSV) {
             await this.bookingService.insert({
                 bookingId: Number(bookingCSV.id),
                 clinicName: bookingCSV.clinicName,
                 dateTime: bookingCSV.datetime,
                 womenEmail: bookingCSV.email,
                 womenName: bookingCSV.name
             })
         } */

        return true;
    }

}
