import { Booking } from "../booking.entity"

export class PaginatedBookingResultDto {
    data: Booking[]
    page: number
    limit: number
    totalCount: number
}