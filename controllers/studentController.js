const studentModel = require('../models/studentModel');

const getStudents = async (req, res) => {
  try {
    const students = await studentModel.getAllStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addStudent = async (req, res) => {
  const { name, email, course } = req.body;
  try {
    const newStudent = await studentModel.createStudent(name, email, course);
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getStudents, addStudent };
