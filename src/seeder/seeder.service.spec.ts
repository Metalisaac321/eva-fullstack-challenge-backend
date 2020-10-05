import { Test, TestingModule } from '@nestjs/testing';
import { Booking } from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';
import { Clinic } from '../clinic/clinic.entity';
import { ClinicService } from '../clinic/clinic.service';
import { createDbTestConnection } from '../utils/createDbTestConnection';
import { Women } from '../women/women.entity';
import { WomenService } from '../women/women.service';
import { Repository } from 'typeorm';
import { SeederService } from './seeder.service';

describe('SeederService', () => {
  let seederService: SeederService;
  let bookingService: BookingService;
  let connection;
  const testConnectionName = 'testConnection';
  let clinicRepository: Repository<Clinic>;
  let womenRepository: Repository<Women>;
  let bookingRepository: Repository<Booking>;

  beforeAll(async () => {
    connection = await createDbTestConnection(testConnectionName);
    clinicRepository = connection.getRepository(Clinic);
    const clinicService = new ClinicService(clinicRepository);
    womenRepository = connection.getRepository(Women);
    const womenService = new WomenService(womenRepository);

    bookingRepository = connection.getRepository(Booking)
    bookingService = new BookingService(bookingRepository, womenService, clinicService);
    seederService = new SeederService(bookingService);
  });

  it('should be sabe all bookings', async () => {
    await seederService.seedBookings();
    const bookings = await bookingRepository.find()

    expect(bookings.length).toBe(10);
  });
});
