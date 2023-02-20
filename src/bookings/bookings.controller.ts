import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { Booking } from './entities/booking.entity';
import { BookingDto } from './entities/booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  create(@Body() bookingDto: BookingDto): Promise<Booking> {
    return this.bookingsService.create(bookingDto);
  }

  @Get()
  findAll(): Promise<Booking[]> {
    return this.findAll();
  }
}
