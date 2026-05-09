import express from 'express';
import pool from '../config/database.js';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Get all salaries (admin only)
router.get('/', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM salaries');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update salary
router.put('/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
  const { base_salary, allowances, deductions, employee_id } = req.body;

  try {
    const connection = await pool.getConnection();
    
    // Check if salary record exists
    const [existing] = await connection.execute(
      'SELECT id FROM salaries WHERE employee_id = ?',
      [employee_id]
    );

    if (existing.length > 0) {
      // Update existing
      await connection.execute(
        'UPDATE salaries SET base_salary = ?, allowances = ?, deductions = ?, effective_date = CURDATE() WHERE employee_id = ?',
        [base_salary, allowances, deductions, employee_id]
      );
    } else {
      // Insert new
      await connection.execute(
        'INSERT INTO salaries (employee_id, base_salary, allowances, deductions, effective_date) VALUES (?, ?, ?, ?, CURDATE())',
        [employee_id, base_salary, allowances, deductions]
      );
    }
    
    connection.release();
    res.json({ success: true, message: 'Salary updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get salary by employee ID (admin only)
router.get('/employee/:employee_id', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
      SELECT s.*, 
             e.first_name, e.last_name, e.employee_id, e.department
      FROM salaries s
      LEFT JOIN employees e ON s.employee_id = e.id
      WHERE s.employee_id = ?
    `, [req.params.employee_id]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Salary record not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Calculate monthly salary for all employees
router.post('/calculate/monthly', verifyToken, verifyRole(['admin']), async (req, res) => {
  const { month, year } = req.body;

  try {
    const connection = await pool.getConnection();
    
    // Get all salaries and calculate
    const [salaries] = await connection.execute(`
      SELECT s.*, e.id as emp_id, e.first_name, e.last_name
      FROM salaries s
      JOIN employees e ON s.employee_id = e.id
      WHERE e.status = 'active'
    `);

    const calculations = salaries.map(salary => ({
      employee_id: salary.emp_id,
      employee_name: `${salary.first_name} ${salary.last_name}`,
      base_salary: salary.base_salary,
      allowances: salary.allowances,
      deductions: salary.deductions,
      gross_salary: salary.base_salary + salary.allowances,
      net_salary: salary.base_salary + salary.allowances - salary.deductions,
      month: month,
      year: year,
      calculation_date: new Date()
    }));

    connection.release();
    res.json({
      success: true,
      message: `Calculated salaries for ${calculations.length} employees`,
      data: calculations
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get salary report with employee info (admin only)
router.get('/report/monthly', verifyToken, verifyRole(['admin']), async (req, res) => {
  const { month, year } = req.query;

  try {
    const connection = await pool.getConnection();
    
    // Get salary report with employee details
    const [report] = await connection.execute(`
      SELECT 
        e.id,
        e.employee_id,
        e.first_name,
        e.last_name,
        e.department,
        e.position,
        s.base_salary,
        s.allowances,
        s.deductions,
        (s.base_salary + s.allowances) as gross_salary,
        (s.base_salary + s.allowances - s.deductions) as net_salary
      FROM employees e
      LEFT JOIN salaries s ON e.id = s.employee_id
      WHERE e.status = 'active'
      ORDER BY e.department, e.first_name
    `);

    // Calculate totals
    const totals = report.reduce((acc, emp) => ({
      count: acc.count + 1,
      total_base: acc.total_base + (emp.base_salary || 0),
      total_allowances: acc.total_allowances + (emp.allowances || 0),
      total_deductions: acc.total_deductions + (emp.deductions || 0),
      total_gross: acc.total_gross + (emp.gross_salary || 0),
      total_net: acc.total_net + (emp.net_salary || 0)
    }), { count: 0, total_base: 0, total_allowances: 0, total_deductions: 0, total_gross: 0, total_net: 0 });

    connection.release();

    res.json({
      month: month,
      year: year,
      totals: totals,
      employees: report
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
