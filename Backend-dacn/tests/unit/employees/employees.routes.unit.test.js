import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import router from '../../../src/routes/employees.js';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/employees', router);
  return app;
};

describe('Employees route unit tests', () => {
  beforeEach(() => {
    process.env.JWT_SECRET = 'unit-test-secret';
  });

  it('GET /api/employees returns 401 without a token', async () => {
    const app = createApp();

    const response = await request(app).get('/api/employees');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('GET /api/employees returns 403 for non-admin token', async () => {
    const app = createApp();
    const employeeToken = jwt.sign(
      { id: 2, username: 'employee', role: 'employee' },
      process.env.JWT_SECRET
    );

    const response = await request(app)
      .get('/api/employees')
      .set('Authorization', `Bearer ${employeeToken}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({ message: 'Forbidden' });
  });
});
