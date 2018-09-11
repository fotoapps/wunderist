// Base Setup
// ==============================

// Set the server environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Require NPM Package Dependencies
var mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session'),
    morgan = require('morgan');

var config = require('./config/config');

var app = express();

// Passport Config
require('./config/passport.js')(passport);


// Configuration
// ==============================
mongoose.set('useCreateIndex', true);
mongoose.connect(config.db, { 
  useNewUrlParser: true,
});

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'orangecountcodeschoolallcodeallday'
}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('./public'));

// Server Routes
// ==============================
app.get('/', function(req, res) {
  res.render('index',
    {
      title: 'ToDo App',
      user: JSON.stringify(req.user)
    }
  );
});

var usersRouter = require('./routes/v1/users');
var apiUsersRouter = require('./routes/v1/api/auth');
var todosRouter = require('./routes/v1/api/todos');

app.use('/users', usersRouter);
app.use('/api/v1/auth', apiUsersRouter);
app.use('/api/v1/todos', todosRouter);

// Catchall Route for Angular
app.use('/*', function(req, res) {
  res.render('index', {
    title: 'ToDo App',
    user: JSON.stringify(req.user)
  });
});

// Start the server
// ==============================
app.listen(config.port);

console.log(process.env.NODE_ENV + ' server on port', config.port);

module.exports = app;
