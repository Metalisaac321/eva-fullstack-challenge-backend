import { Booking } from '../booking/booking.entity';
import { BookingService } from '../booking/booking.service';
import { Clinic } from '../clinic/clinic.entity';
import { ClinicService } from '../clinic/clinic.service';
import { createDbTestConnection } from '../utils/createDbTestConnection';
import { Women } from '../women/women.entity';
import { WomenService } from '../women/women.service';
import { Repository } from 'typeorm';
import {
  BOOKING_UPDATED,
  CONSUMED_MEDICATION_SAVED,
  CONSUMED_MEDICATION_TO_INSERT,
  CONSUMED_MEDICATION_TO_SAVE,
  CONSUMED_MEDITATION_TO_INSERT_DIFERENT_ID,
} from './constants';
import { ConsumedMedication } from './consumed-medication.entity';
import { ConsumedMedicationService } from './consumed-medication.service';
import { INSERT_BOOKING_TEST_CASE, INSERT_BOOKING_DIFERENTE_ID_TEST_CASE } from '../booking/constants';

describe('ConsumedMedicationService', () => {
  let consumedMedicationService: ConsumedMedicationService;
  let bookingService: BookingService;
  let bookingRepository: Repository<Booking>;
  let connection;
  const testConnectionName = 'testConnection';
  let consumedMedicationRepository: Repository<ConsumedMedication>;


  beforeAll(async () => {
    connection = await createDbTestConnection(testConnectionName);
    const clinicService = new ClinicService(connection.getRepository(Clinic));
    const womenService = new WomenService(connection.getRepository(Women));

    bookingRepository = connection.getRepository(Booking)
    bookingService = new BookingService(bookingRepository, womenService, clinicService);

    consumedMedicationRepository = connection.getRepository(ConsumedMedication);
    consumedMedicationService = new ConsumedMedicationService(consumedMedicationRepository, bookingService);
  });

  afterAll(async () => {
    await connection.dropDatabase()
  })

  test('Should save diferent consumed medication with the same name', async () => {
    const consumedMedicationSaved = await consumedMedicationService.save(CONSUMED_MEDICATION_TO_SAVE);
    await consumedMedicationService.save(CONSUMED_MEDICATION_TO_SAVE);
    const consumedMedications = await consumedMedicationRepository.count();
    expect(consumedMedications).toBe(1);
    expect(consumedMedicationSaved).toEqual(CONSUMED_MEDICATION_SAVED)
  })

  test('Must dont save Booking if not found', async () => {
    const consumedMedicationSaved = await consumedMedicationService.insert(CONSUMED_MEDICATION_TO_INSERT);

    expect(consumedMedicationSaved).toBeUndefined();
  })

  test('Must save booking with their consumedMedications', async () => {
    await bookingService.insert(INSERT_BOOKING_TEST_CASE);
    await bookingService.insert(INSERT_BOOKING_DIFERENTE_ID_TEST_CASE);
    const consumedMedicationSaved = await consumedMedicationService.insert(CONSUMED_MEDICATION_TO_INSERT);
    await consumedMedicationService.insert(CONSUMED_MEDITATION_TO_INSERT_DIFERENT_ID);
    const bookingUpdated = await bookingRepository.findOne({ relations: ['consumedMedications'] });
    const consumedMedications = await consumedMedicationRepository.count();

    expect(consumedMedications).toBe(3)
    expect(bookingUpdated.consumedMedications.length).toBe(3)
    expect(consumedMedicationSaved).toEqual(BOOKING_UPDATED)
  })
});
