import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import router from '../../../src/routes/attendance.js';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/attendance', router);
  return app;
};

describe('Attendance route unit tests', () => {
  it('GET /api/attendance returns 401 without a token', async () => {
    const app = createApp();

    const response = await request(app).get('/api/attendance');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('POST /api/attendance/checkin returns 401 without a token', async () => {
    const app = createApp();

    const response = await request(app).post('/api/attendance/checkin');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });
});
