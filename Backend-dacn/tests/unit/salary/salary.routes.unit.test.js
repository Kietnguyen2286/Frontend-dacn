import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import router from '../../../src/routes/salary.js';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/salary', router);
  return app;
};

describe('Salary route unit tests', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'unit-test-secret';
  });

  it('GET /api/salary returns 401 without a token', async () => {
    const app = createApp();

    const response = await request(app).get('/api/salary');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('PUT /api/salary/:id returns 403 for non-admin token', async () => {
    const app = createApp();
    const employeeToken = jwt.sign(
      { id: 2, username: 'employee', role: 'employee' },
      process.env.JWT_SECRET
    );

    const response = await request(app)
      .put('/api/salary/1')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({ base_salary: 1000, allowances: 100, deductions: 10 });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Forbidden' });
  });
});
