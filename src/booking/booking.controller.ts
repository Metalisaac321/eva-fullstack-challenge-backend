import { Body, Controller, Post } from '@nestjs/common';
import { Booking } from './booking.entity';
import { BookingService } from './booking.service';
import { PaginationDto } from './dto/pagination.dto';

@Controller('bookings')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    /**
   * Route that get the Booking list from database
   */
    @Post()
    async getBookings(
        @Body() paginationDto: PaginationDto,
    ): Promise<any> {
        return await this.bookingService.findAll(paginationDto)
    }

}
