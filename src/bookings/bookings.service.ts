import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { BookingDto } from './entities/booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking) private bookingsRepository: Repository<Booking>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find();
  }

  async findById(id: number): Promise<Booking> {
    return this.bookingsRepository.findOneBy({ id: id });
  }

  async create(bookingDto: BookingDto) {
    return this.bookingsRepository.save(bookingDto);
  }

  async update(bookingDto: BookingDto, id: number) {
    return this.bookingsRepository.update(id, bookingDto);
  }

  async remove(id: number) {
    return this.bookingsRepository.delete(id);
  }
}
