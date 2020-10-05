import { Booking } from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';
import { Clinic } from '../clinic/clinic.entity';
import { ClinicService } from '../clinic/clinic.service';
import { createDbTestConnection } from '../utils/createDbTestConnection';
import { Women } from '../women/women.entity';
import { WomenService } from '../women/women.service';
import { Repository } from 'typeorm';
import { SeederService } from './seeder.service';
import { ConsumedMedication } from '../consumed-medication/consumed-medication.entity';
import { ConsumedMedicationService } from '../consumed-medication/consumed-medication.service';

describe('SeederService', () => {
  let seederService: SeederService;
  let connection;
  const testConnectionName = 'testConnection';
  let bookingRepository: Repository<Booking>;
  let consumedMedicationService: ConsumedMedicationService;
  let consumedMedicationRepository: Repository<ConsumedMedication>;

  beforeAll(async () => {
    connection = await createDbTestConnection(testConnectionName);
    const clinicService = new ClinicService(connection.getRepository(Clinic));
    const womenService = new WomenService(connection.getRepository(Women));

    bookingRepository = connection.getRepository(Booking)
    const bookingService = new BookingService(bookingRepository, womenService, clinicService);
    consumedMedicationRepository = connection.getRepository(ConsumedMedication);
    consumedMedicationService = new ConsumedMedicationService(consumedMedicationRepository, bookingService)

    seederService = new SeederService(bookingService, consumedMedicationService);
  });

  afterAll(async () => {
    await connection.dropDatabase()
  })

  test('should be save all bookings from CSV file', async () => {
    await seederService.seedBookings();
    const bookings = await bookingRepository.count()

    expect(bookings).toBe(10);
  });

  test('Must be save all explorations from CSV file', async () => {
    await seederService.seedExplorations();
    const consumedMedications = await consumedMedicationRepository.count();

    expect(consumedMedications).toBe(5);
  })
});
