const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/students');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/students', studentsRouter);

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Central error handler
app.use(errorHandler);

module.exports = app;
