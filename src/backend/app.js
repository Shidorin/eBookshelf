var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const cors = require('cors')
const port = 8080
var app = express();
const schedule = require('node-schedule');

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


const Book = require('./models/Books')
const UserBooks = require('./models/UserBooks')

const rule = new schedule.RecurrenceRule();
rule.minute = 21;

const job = schedule.scheduleJob(rule, function () {
  console.log('update books scores');
  Book.findAll({
    raw: true,
    attributes: ["id"],
  }).then(async books => {
    for (oneBook of books) {
      await UserBooks.findAll({
        where: {
          book_id: oneBook.id
        },
        raw: true,
        attributes: ["score"],
      }).then(async bookScores => {
        let tmpScore = 0.0;
        let count = 0;
        for (bookScore of bookScores) {
          tmpScore += parseFloat(bookScore.score)
          count += 1;
        }
        if (count == 0) tmpScore = null;
        else tmpScore = (tmpScore / count).toPrecision(2)
        console.log("rating: " + tmpScore)

        Book.update(
          { rating: tmpScore, },
          { where: { id: oneBook.id } }
        )
      })
    }
  })
});

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
// add book to user list
var bookToList = require('./routes/bookToList');
const { divide } = require('lodash');
app.use('/bookToList', bookToList.router)

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
