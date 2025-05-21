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

// Update a student
const updateStudent = async (id, name, email, course) => {
  const result = await pool.query(
    'UPDATE students SET name = $1, email = $2, course = $3 WHERE id = $4 RETURNING *',
    [name, email, course, id]
  );
  return result.rows[0];
};

// Delete a student
const deleteStudent = async (id) => {
  await pool.query('DELETE FROM students WHERE id = $1', [id]);
};

module.exports = {
  createStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};