var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const cors = require('cors')
const port = 8080
var app = express();

//Database
const db = require('./config/database')

db.authenticate()
  .then(() => console.log('database connected'))
  .catch(err => console.log('Error ' + err))


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors({
  origin: [
    'http://127.0.0.1:3000',
    'http://localhost:3000'
  ],
  credentials: true
}))

// at the moment all books information
var books = require('./routes/books')
app.use('/books', books.router)
// user related books
var bookList = require('./routes/bookList')
app.use('/bookList', bookList.router)
// one book information
var bookEntity = require('./routes/bookEntity')
app.use('/bookEntity', bookEntity.router)
// login
var login = require('./routes/login')
app.use('/login', login.router)
// signup
var signup = require('./routes/signup')
app.use('/signup', signup.router)

app.get('/', (req, res) => {
  //res.send('Hello!')
})

app.listen(port, () => {
  //console.log(`Example app listening at http://localhost:${port}`)
})

//// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
//
//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//
//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//
//// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});
//
//// error handler
//app.use(function(err, req, res, next) {
//  // set locals, only providing error in development
//  res.locals.message = err.message;
//  res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//  // render the error page
//  res.status(err.status || 500);
//  res.render('error');
//});

module.exports = app;
