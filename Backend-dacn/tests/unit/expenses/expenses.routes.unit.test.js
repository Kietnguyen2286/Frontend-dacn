import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import router from '../../../src/routes/expenses.js';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/expenses', router);
  return app;
};

describe('Expenses route unit tests', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'unit-test-secret';
  });

  it('GET /api/expenses returns 401 without a token', async () => {
    const app = createApp();

    const response = await request(app).get('/api/expenses');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('PUT /api/expenses/:id returns 403 for non-admin token', async () => {
    const app = createApp();
    const employeeToken = jwt.sign(
      { id: 2, username: 'employee', role: 'employee' },
      process.env.JWT_SECRET
    );

    const response = await request(app)
      .put('/api/expenses/1')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({ status: 'approved' });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Forbidden' });
  });
});
