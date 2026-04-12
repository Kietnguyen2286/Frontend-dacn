import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import router from '../../../src/routes/kpi.js';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/kpi', router);
  return app;
};

describe('KPI route unit tests', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'unit-test-secret';
  });

  it('GET /api/kpi returns 401 without a token', async () => {
    const app = createApp();

    const response = await request(app).get('/api/kpi');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('POST /api/kpi returns 403 for non-admin token', async () => {
    const app = createApp();
    const employeeToken = jwt.sign(
      { id: 2, username: 'employee', role: 'employee' },
      process.env.JWT_SECRET
    );

    const response = await request(app)
      .post('/api/kpi')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({ employee_id: 1, metric: 'Quality', target: 100, actual: 90, period: '2026-Q2' });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Forbidden' });
  });
});
