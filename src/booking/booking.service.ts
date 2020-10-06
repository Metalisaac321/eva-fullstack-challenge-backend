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
import { PaginationDto } from "./dto/pagination.dto";
import * as _ from 'lodash';
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

    async findAll({ clinicName, consumedMedications = [], date, page, filterMode }: PaginationDto): Promise<Booking[]> {
        const limit = 1000;
        const skippedItems = (page - 1) * limit;

        const queryBuilder = this.bookingRepository
            .createQueryBuilder('booking')
            .leftJoin("booking.women", 'women')
            .leftJoin('booking.clinic', 'clinic')
            .leftJoin('booking.consumedMedications', 'consumedMedications')
            .select([
                'booking',
                'women.name',
                'women.email',
                'clinic.name',
                'consumedMedications.name',
            ])
            .offset(skippedItems)
            .limit(limit)

        if (date) {
            queryBuilder.andWhere('booking.date = :date', { date })
        }

        if (clinicName) {
            queryBuilder.andWhere('clinic.name = :clinicName', { clinicName })
        }

        let bookings = await queryBuilder.getMany();

        const consumedMedicationsSize = consumedMedications.length;
        if (consumedMedicationsSize > 0) {
            const newBookings = [];

            if (filterMode === 'strictMode') {
                for await (const booking of bookings) {
                    const bookingConsumedMedications = _.map(booking.consumedMedications, (b) => b.name)

                    if (_.isEqual(bookingConsumedMedications, consumedMedications)) {
                        newBookings.push(booking);
                    }
                }
            }
            if (filterMode == 'laxMode') {
                for await (const booking of bookings) {
                    const bookingConsumedMedications = _.map(booking.consumedMedications, (b) => b.name)
                    if (_.intersection(bookingConsumedMedications, consumedMedications).length > 0) {
                        newBookings.push(booking);
                    }
                }
            }
            bookings = newBookings
        }

        return bookings;
    }

    async findById(bookingId: number): Promise<Booking> {
        return this.bookingRepository.findOne({ bookingId })
    }

    async save(booking: Booking): Promise<Booking> {
        return this.bookingRepository.save(booking);
    }

    async count(): Promise<number> {
        return this.bookingRepository.count();
    }
}