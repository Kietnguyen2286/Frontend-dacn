import express from 'express';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import router from '../../../src/routes/auth.js';

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/auth', router);
  return app;
};

describe('Auth route unit tests', () => {
  it('POST /api/auth/login returns 400 when credentials are missing', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/auth/login')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Username and password required' });
  });

  it('POST /api/auth/register returns 400 when required fields are missing', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'sample-user' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'All fields required' });
  });
});
