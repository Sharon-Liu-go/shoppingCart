var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session')
var logger = require('morgan');
const exphbs = require('express-handlebars')
const PORT = 3000
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs', helpers: require('./config/handlebars-helpers') }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))

app.use(session({
  secret: 'cart',
  name: 'cart',
  cookie: { maxAge: 80000 },
  resave: false,
  saveUninitialized: true,
}));

app.use(flash())

app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message')
  res.locals.error_message = req.flash('error_message')
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

module.exports = app;
