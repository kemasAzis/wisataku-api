import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('DestinasiController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  }, 120000);

  it('GET /destinasi harus mengembalikan status 200 dan array', () => {
    return request(app.getHttpServer())
      .get('/destinasi')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('POST /destinasi tanpa token harus ditolak (401)', () => {
    return request(app.getHttpServer())
      .post('/destinasi')
      .send({ nama: 'Bukit Merese', kategori: 'Pantai', hargaTiket: 10000 })
      .expect(401);
  });

  afterAll(async () => await app.close());
});