import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingService } from './booking.service';
import { PaginationDto } from './dto/pagination.dto';

@Controller('bookings')
export class BookingController {
    constructor(private bookingService: BookingService) { }

    /**
   * Route that get the Booking list from database
   */
    @UseGuards(JwtAuthGuard)
    @Post()
    async getBookings(
        @Body() paginationDto: PaginationDto,
    ): Promise<any> {
        return await this.bookingService.findAll(paginationDto)
    }

}
