import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TickerController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('/ticker (GET)', () => {
    it('should return ticker and  status code 200', () => {
      const queryParams = 'firstCurrency=BTC&secondCurrency=USD&exchangesId=bitmex';
      return request(app.getHttpServer())
        .get('/ticker')
        .query(queryParams)
        .expect(200);
    });

    it('should return error invalid couple', () => {
      const queryParams = 'firstCurrency=ADSD&secondCurrency=SSSS&exchangesId=bitmex';
      const error = { statusCode: 400, error: 'Bad Request', message: 'bitmex does not have market symbol ADSD/SSSS' };
      return request(app.getHttpServer())
        .get('/ticker')
        .query(queryParams)
        .expect(400)
        .expect(error);
    });

    it('should return error nonexistent exchange', () => {
      const queryParams = 'firstCurrency=ADSD&secondCurrency=SSSS&exchangesId=nonexistent';
      const error = { statusCode: 400, error: 'Bad Request', message: 'Биржи nonexistent не найдено' };
      return request(app.getHttpServer())
        .get('/ticker')
        .query(queryParams)
        .expect(400)
        .expect(error);
    });
  });
});
