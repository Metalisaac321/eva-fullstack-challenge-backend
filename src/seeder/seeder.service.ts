import { Injectable } from '@nestjs/common';
import { BookingService } from '../booking/booking.service';
import * as csv from 'csvtojson';
import { BookingCSV } from './interfaces/booking-csv';

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
}
