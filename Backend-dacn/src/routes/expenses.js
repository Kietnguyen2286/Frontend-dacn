import express from 'express';
import pool from '../config/database.js';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Get all expenses
router.get('/', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const query = req.user.role === 'admin'
      ? 'SELECT * FROM expenses'
      : 'SELECT * FROM expenses WHERE employee_id = ?';
    
    const params = req.user.role === 'admin' ? [] : [req.user.id];
    const [rows] = await connection.execute(query, params);
    connection.release();

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create expense
router.post('/', verifyToken, async (req, res) => {
  const { employee_id, amount, description, category, date } = req.body;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO expenses (employee_id, amount, description, category, date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [employee_id, amount, description, category, date, 'pending']
    );
    connection.release();

    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Approve expense (admin only)
router.put('/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
  const { status } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'UPDATE expenses SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    connection.release();

    res.json({ success: true, message: 'Expense updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get expense details with employee info (admin only)
router.get('/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
      SELECT e.*, 
             emp.first_name, emp.last_name, emp.employee_id, emp.department
      FROM expenses e
      LEFT JOIN employees emp ON e.employee_id = emp.id
      WHERE e.id = ?
    `, [req.params.id]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get pending expenses for approval (admin only)
router.get('/approval/pending', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(`
      SELECT e.*, 
             emp.first_name, emp.last_name, emp.employee_id, emp.department
      FROM expenses e
      LEFT JOIN employees emp ON e.employee_id = emp.id
      WHERE e.status = 'pending'
      ORDER BY e.date DESC
    `);
    connection.release();

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get expense report by month/year (admin only)
router.get('/report/monthly', verifyToken, verifyRole(['admin']), async (req, res) => {
  const { month, year } = req.query;

  try {
    const connection = await pool.getConnection();
    
    // Get summary by category
    const [summary] = await connection.execute(`
      SELECT 
        category,
        COUNT(*) as count,
        SUM(amount) as total_amount,
        SUM(CASE WHEN status = 'approved' THEN amount ELSE 0 END) as approved_amount,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending_amount,
        SUM(CASE WHEN status = 'rejected' THEN amount ELSE 0 END) as rejected_amount
      FROM expenses
      WHERE MONTH(date) = ? AND YEAR(date) = ?
      GROUP BY category
    `, [month, year]);

    // Get total summary
    const [total] = await connection.execute(`
      SELECT 
        COUNT(*) as total_count,
        SUM(amount) as total_amount,
        SUM(CASE WHEN status = 'approved' THEN amount ELSE 0 END) as approved_total,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pending_total,
        SUM(CASE WHEN status = 'rejected' THEN amount ELSE 0 END) as rejected_total
      FROM expenses
      WHERE MONTH(date) = ? AND YEAR(date) = ?
    `, [month, year]);

    // Get detailed list
    const [details] = await connection.execute(`
      SELECT e.*, 
             emp.first_name, emp.last_name, emp.employee_id, emp.department
      FROM expenses e
      LEFT JOIN employees emp ON e.employee_id = emp.id
      WHERE MONTH(e.date) = ? AND YEAR(e.date) = ?
      ORDER BY e.date DESC
    `, [month, year]);

    connection.release();

    res.json({
      summary: summary,
      total: total[0],
      details: details
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
