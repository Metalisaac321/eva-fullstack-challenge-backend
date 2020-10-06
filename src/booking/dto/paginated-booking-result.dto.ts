import { Booking } from "../booking.entity"

export class PaginatedBookingResultDto {
    data: Booking[]
    totalCount: number
}