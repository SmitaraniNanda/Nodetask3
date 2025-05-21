const Student = require('../models/student');
const HTTP_STATUS = require('../constants/httpStatus');

const addStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;

    // Basic validation
    if (!name || !email || !course) {
      return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        message: HTTP_STATUS.BAD_REQUEST.message,
        error: 'Name, email, and course are required',
      });
    }

    //  Trigger 500 if name is numeric
    if (!isNaN(name)) {
      throw new Error('Name must not be a number');
    }

    //  Trigger 500 if email is invalid (missing @)
    if (!email.includes('@')) {
      throw new Error('Email must include @');
    }

    const newStudent = await Student.createStudent(name, email, course);
    return res.status(HTTP_STATUS.CREATED.code).json({
      message: HTTP_STATUS.CREATED.message,
      data: newStudent,
    });

  } catch (err) {
    console.error('Error in addStudent:', err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAllStudents();
    return res.status(HTTP_STATUS.OK.code).json({
      message: HTTP_STATUS.OK.message,
      data: students,
    });
  } catch (err) {
    console.error('Error in getAllStudents:', err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const { id } = req.params;

    if (!name || !email || !course) {
      return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        message: 'Missing required fields',
      });
    }

    const updatedStudent = await Student.updateStudent(id, name, email, course);
    return res.status(HTTP_STATUS.OK.code).json({
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (err) {
    console.error('Error updating student:', err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.deleteStudent(id);
    return res.status(HTTP_STATUS.OK.code).json({
      message: 'Student deleted successfully',
    });
  } catch (err) {
    console.error('Error deleting student:', err);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
      error: err.message,
    });
  }
};

module.exports = {
  addStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
