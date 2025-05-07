const express = require('express');
const router = express.Router();
const pool = require('../db/pool'); // PostgreSQL pool

// GET all students
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST a new student
router.post('/', async (req, res) => {
  const { name, email, course } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO students (name, email, course) VALUES ($1, $2, $3) RETURNING *',
      [name, email, course]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
