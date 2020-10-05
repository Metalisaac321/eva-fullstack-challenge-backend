import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clinic } from "../clinic/clinic.entity";
import { Women } from "../women/women.entity";
import { Repository } from "typeorm";
import { Booking } from "./booking.entity";
import { InsertBookingDto } from "./dto/insert-booking.dto";
import * as moment from 'moment';
import { WomenService } from "../women/women.service";
import { ClinicService } from "../clinic/clinic.service";

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
        private womenService: WomenService,
        private clinicService: ClinicService,
    ) { }

    async insert({
        bookingId, clinicName, dateTime, womenEmail, womenName,
    }: InsertBookingDto): Promise<Booking> {
        let women = new Women();
        women.email = womenEmail.trim();
        women.name = womenName.trim();
        women = await this.womenService.insert(women);

        let clinic = new Clinic();
        clinic.name = clinicName.trim();
        clinic = await this.clinicService.insert(clinic);

        const booking = new Booking();
        booking.bookingId = bookingId;
        booking.date = moment(dateTime).utc().format('DD/MM/yyyy');
        booking.clinic = clinic;
        booking.women = women;
        booking.dateTime = dateTime;

        await this.bookingRepository.save(booking);

        return booking;
    }

    async findById(bookingId: number): Promise<Booking> {
        return this.bookingRepository.findOne({ bookingId })
    }

    async save(booking: Booking) {
        return this.bookingRepository.save(booking);
    }
}