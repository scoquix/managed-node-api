import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import request from "supertest";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/os-monitor (GET) OK`, () => {
    return request(app.getHttpServer())
      .get('/os-monitor')
      .expect(200);
  });

  it(`/os-monitor/:component - HappyCase (GET) OK`, () => {
    return request(app.getHttpServer())
      .get('/os-monitor/ram')
      .expect(200);
  });

  it(`/os-monitor/:component - ErrorCase (GET) NOT_FOUND`, () => {
    return request(app.getHttpServer())
      .get('/os-monitor/error')
      .expect(404);
  });
});
