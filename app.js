var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require('express-fileupload');

var index = require('./routes/index');
var users = require('./routes/users');
var roles = require('./routes/roles');
var students = require('./routes/students');
var studentsStatus = require('./routes/students_status');
var departments = require('./routes/department');
var courses = require('./routes/course');
var scores = require('./routes/scores');
var scoreTypes = require('./routes/score_types');
var courseProblems = require('./routes/course_problems');
var courseProblemTypes = require('./routes/course_problem_types');
var portofolios = require('./routes/portofolios');
var portofolioTypes = require('./routes/portofolio_types');
var hospitals = require('./routes/hospital');
var hospitalDepartments = require('./routes/hospitaldepartment');
var hospitalSelect = require('./routes/hospitalselect');
var seminars = require('./routes/seminar');
var seminarFileUpload = require('./routes/seminar_fileupload');
var security = require('./routes/security');
var reports = require('./routes/reports');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.use('/', index);
app.use('/api/users', users);
app.use('/api/roles', roles);
app.use('/api/students', students);
app.use('/api/students_status', studentsStatus);
app.use('/api/departments', departments);
app.use('/api/courses', courses);
app.use('/api/scores', scores);
app.use('/api/scoretypes', scoreTypes);
app.use('/api/courseproblems', courseProblems);
app.use('/api/courseproblemtypes', courseProblemTypes);
app.use('/api/portofolios', portofolios);
app.use('/api/portofoliotypes', portofolioTypes);
app.use('/api/hospitals', hospitals);
app.use('/api/hospitaldepartments', hospitalDepartments);
app.use('/api/hospitalselect', hospitalSelect);
app.use('/api/seminars', seminars);
app.use('/api/seminarupload', seminarFileUpload);
app.use('/api/security', security);
app.use('/api/reports', reports);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
