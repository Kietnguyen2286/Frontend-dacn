import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import employeeRouter from './routes/employees.js';
import leaveRouter from './routes/leaves.js';
import attendanceRouter from './routes/attendance.js';
import salaryRouter from './routes/salary.js';
import expenseRouter from './routes/expenses.js';
import kpiRouter from './routes/kpi.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = (process.env.FRONTEND_URL || '').replace(/\/$/, '');

const allowedOrigins = new Set(
  [
    FRONTEND_URL,
    'https://fantastic-quietude-production.up.railway.app',
    'https://ravishing-enjoyment-production.up.railway.app',
    'https://testdacn.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean)
);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

// Middleware
// Configure CORS
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/leaves', leaveRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/kpi', kpiRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'API is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
