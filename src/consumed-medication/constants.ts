import { Booking } from "../booking/booking.entity";
import { ConsumedMedication } from "./consumed-medication.entity";
import { InsertConsumedMedicationDto } from "./dto/insert-consumed-medication.dto";

export const CONSUMED_MEDICATION_TO_SAVE = 'HORMONE_THERAPY';
export const CONSUMED_MEDICATION_SAVED: ConsumedMedication = {
    consumedMedicationId: 1,
    name: CONSUMED_MEDICATION_TO_SAVE,
}

export const CONSUMED_MEDICATION_TO_INSERT: InsertConsumedMedicationDto = {
    bookingId: 0,
    consumedMedications: '["HORMONE_THERAPY","BLOOD_THINNERS","VITAMINS"]',
}

export const CONSUMED_MEDITATION_TO_INSERT_DIFERENT_ID: InsertConsumedMedicationDto = {
    bookingId: 1,
    consumedMedications: '["HORMONE_THERAPY","BLOOD_THINNERS","VITAMINS"]'
}

export const BOOKING_UPDATED: Booking = {
    bookingId: 0,
    consumedMedications: [
        { consumedMedicationId: 1, name: "HORMONE_THERAPY" },
        { consumedMedicationId: 2, name: "BLOOD_THINNERS" },
        { consumedMedicationId: 3, name: "VITAMINS" }
    ],
    date: "26/11/2019",
    dateTime: "2019-11-26T01:19:51.813Z"
}