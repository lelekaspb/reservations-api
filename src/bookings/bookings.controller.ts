import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
    console.log('findAll bookings - bookings controller');
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Booking> {
    return this.bookingsService.findById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() bookingDto: BookingDto,
  ): Promise<any> {
    console.log('update booking');
    return this.bookingsService.update(bookingDto, id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    console.log('delete');
    return this.bookingsService.remove(id);
  }
}
