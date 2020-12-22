var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors"); //아직 미완
const session = require("express-session");
//컨트롤러는 라우터와 분리 -> 12/22 routes/users.js로 변경. app.js에서 라우터 제거 후 routes에 기능 몰빵
//const mainController = require("../controllers");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//여기까지는 뷰를 위한 미들웨어

//세션 사용.
app.use(
  session({
    secret: 'SecretKey',
    resave: false,
    saveUninitialized: true
  })
);
//
/*
app.use(
  cors({
    //origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  })
);
*/

//주소 분기 - deprecated.
//routes/users.js가 메인 라우터 입니다.
//app.post("/signin", mainController.signInController);
//app.post("/signout", mainController.signOutController);
//
app.use('/', indexRouter); //이건 routes/index.js 를 통해 views/index.js로 넘어갑니다.
app.use('/controllers', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
