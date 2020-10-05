import { INSERT_CLINIC_TEST_CASE } from '../clinic/constants';
import { INSERT_WOMEN_TEST_CASE } from '../women/constants';
import { Booking } from './booking.entity';
import { InsertBookingDto } from './dto/insert-booking.dto'

export const INSERT_BOOKING_TEST_CASE: InsertBookingDto = {
    bookingId: 0,
    clinicName: INSERT_CLINIC_TEST_CASE.name,
    womenEmail: INSERT_WOMEN_TEST_CASE.email,
    womenName: INSERT_WOMEN_TEST_CASE.name,
    dateTime: '2019-11-26T01:19:51.813Z'
};

export const INSERTED_BOOKING_TEST_CASE: Booking = {
    bookingId: 0,
    date: '26/11/2019"',
    dateTime: '2019-11-26T01:19:51.813Z',
    clinic: { clinicId: 1, name: 'SANTA_FE' },
    women: { womenId: 1, name: 'Emma', email: 'emma@gmail.com' }
}


export const INSERT_BOOKING_DIFERENT_ID_TEST_CASE: InsertBookingDto = {
    bookingId: 1,
    clinicName: INSERT_CLINIC_TEST_CASE.name,
    womenEmail: INSERT_WOMEN_TEST_CASE.email,
    womenName: INSERT_WOMEN_TEST_CASE.name,
    dateTime: '2019-11-26T01:19:51.813Z'
};