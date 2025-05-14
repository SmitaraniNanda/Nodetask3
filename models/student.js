const pool = require('../db/pool');

const createStudent = async (name, email, course) => {
  const res = await pool.query(
    'INSERT INTO students (name, email, course) VALUES ($1, $2, $3) RETURNING *',
    [name, email, course]
  );
  return res.rows[0];
};

const getAllStudents = async () => {
  const res = await pool.query('SELECT * FROM students ORDER BY id');
  return res.rows;
};

module.exports = { createStudent, getAllStudents };
