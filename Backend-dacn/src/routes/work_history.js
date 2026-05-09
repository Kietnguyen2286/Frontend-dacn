import express from 'express';
import pool from '../config/database.js';
import { verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

// Get all work histories
router.get('/', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(
      `SELECT wh.*, e.employee_id, e.first_name, e.last_name, e.department
       FROM work_history wh
       JOIN employees e ON wh.employee_id = e.id
       ORDER BY wh.transfer_date DESC`
    );
    connection.release();

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create work history
router.post('/', verifyToken, verifyRole(['admin']), async (req, res) => {
  const { employee_id, event_type, from_position, to_position, reason, salary_change } = req.body;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      `INSERT INTO work_history (employee_id, previous_position, current_position, reason, transfer_date)
       VALUES (?, ?, ?, ?, NOW())`,
      [employee_id, from_position, to_position, reason]
    );
    connection.release();

    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update work history status
router.put('/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
  const { status } = req.body;
  
  try {
    const connection = await pool.getConnection();
    // For now, we'll store status in reason field with a prefix
    const [currentRow] = await connection.execute(
      'SELECT reason FROM work_history WHERE id = ?',
      [req.params.id]
    );
    
    const updatedReason = `[${status.toUpperCase()}] ${currentRow[0]?.reason || ''}`;
    
    await connection.execute(
      'UPDATE work_history SET reason = ? WHERE id = ?',
      [updatedReason, req.params.id]
    );
    connection.release();

    res.json({ success: true, message: 'Work history updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
