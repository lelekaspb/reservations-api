import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BookingDto } from './../src/bookings/entities/booking.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Booking } from '../src/bookings/entities/booking.entity';
import { Repository, Connection } from 'typeorm';

describe('BookingsController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule;
  let bookingRepository: Repository<Booking>;
  let connection: Connection;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    bookingRepository = moduleFixture.get(getRepositoryToken(Booking));
    connection = moduleFixture.get(Connection);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await connection.dropDatabase();
    await connection.runMigrations();
    await moduleFixture.close();
  });

  describe('GET Bookings', () => {
    it('should retrieve all existing bookings (GET)', async () => {
      // how many ?
      // create one
      // retrieve all
      // do I have one more ?

      // Arrange
      await Promise.all([
        await bookingRepository.insert(
          new BookingDto(
            'Nina',
            3,
            new Date(2023, 2, 15),
            '+45 111 11 111',
            'nina@example.dk',
            'be ready on time',
          ),
        ),

        await bookingRepository.insert(
          new BookingDto(
            'Henrik',
            2,
            new Date(2023, 2, 15),
            '+45 111 11 222',
            'henrik@example.dk',
            'one veggy',
          ),
        ),
      ]);

      // Act
      // {body} : {body: Booking[]} - in order to work with destructuring
      const { body }: { body: Booking[] } = await request(app.getHttpServer())
        .get('/bookings')
        .expect(200);

      console.log(body);

      // Assert (expect)
      expect(body.length).toEqual(2);
    });
  });

  describe('POST Bookings', () => {
    it('should create a new valid booking (POST)', async () => {
      const booking = new BookingDto(
        'Fox',
        3,
        new Date(),
        '+1 206 55 55 55 55',
        'mulder@fbi.usa',
        'we only eat gluten free food',
      );

      const { body } = await request(app.getHttpServer())
        .post('/bookings')
        .send(booking)
        .expect(201);

      expect(body.name).toEqual('Fox');
    });
  });

  afterAll(() => {
    app.close();
  });
});
