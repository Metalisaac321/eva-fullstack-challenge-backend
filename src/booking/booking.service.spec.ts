import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { Repository } from 'typeorm';
import { createDbTestConnection } from '../utils/createDbTestConnection';
import { INSERTED_BOOKING_TEST_CASE, INSERT_BOOKING_DIFERENT_ID_TEST_CASE, INSERT_BOOKING_TEST_CASE } from './constants';
import { Clinic } from '../clinic/clinic.entity';
import { ClinicService } from '../clinic/clinic.service';
import { WomenService } from '../women/women.service';
import { Women } from '../women/women.entity';

describe('BookingService', () => {
  let bookingService: BookingService;
  let connection;
  const testConnectionName = 'testConnection';
  let clinicRepository: Repository<Clinic>;
  let womenRepository: Repository<Women>;


  beforeAll(async () => {
    connection = await createDbTestConnection(testConnectionName);
    clinicRepository = connection.getRepository(Clinic);
    const clinicService = new ClinicService(clinicRepository);
    womenRepository = connection.getRepository(Women);
    const womenService = new WomenService(womenRepository);

    const bookingRepository = connection.getRepository(Booking)
    bookingService = new BookingService(bookingRepository, womenService, clinicService);
  });

  afterAll(async () => {
    await connection.dropDatabase()
  })

  test('Should Save Booking', async () => {
    const newBooking = await bookingService.insert(INSERT_BOOKING_TEST_CASE)

    expect(newBooking.bookingId).toBe(INSERTED_BOOKING_TEST_CASE.bookingId);
    expect(newBooking.clinic.name).toBe(INSERTED_BOOKING_TEST_CASE.clinic.name);
    expect(newBooking.women.name).toBe(INSERTED_BOOKING_TEST_CASE.women.name);
  })

  test('If found same women or clinic do not insert in db again', async () => {
    const newBooking = await bookingService.insert(INSERT_BOOKING_DIFERENT_ID_TEST_CASE);
    const women = await womenRepository.find();
    const clinics = await clinicRepository.find()

    expect(women.length).toBe(1);
    expect(clinics.length).toBe(1);
    expect(newBooking.bookingId).toBe(1);
  })
});
