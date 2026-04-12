import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import router from '../../../src/routes/leaves.js';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/leaves', router);
  return app;
};

describe('Leaves route unit tests', () => {
  it('GET /api/leaves returns 401 without a token', async () => {
    const app = createApp();

    const response = await request(app).get('/api/leaves');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('POST /api/leaves returns 401 without a token', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/leaves')
      .send({ employee_id: 1, leave_type: 'annual' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });
});
