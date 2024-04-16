var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var animal = require("./models/animal"); //added

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function(user) {
        if (err) { 
          return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err) {
        return done(err)
      });
  }
));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var animalRouter = require('./routes/animal');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animal', animalRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate())); // Use LocalStrategy with Account.authenticate()
passport.serializeUser(Account.serializeUser()); // Serialize user
passport.deserializeUser(Account.deserializeUser()); // Deserialize user

require('dotenv').config();// Added
var mongoose = require('mongoose'); // Added
const connectionString = process.env.MONGO_CON; //Added
//Mangoose
mongoose.connect(connectionString);

let reseed = true;
if (reseed){
  recreateDB();
}

// Added the MongoDB connection status check
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
    console.log("Connection to DB succeeded");
    
});

async function recreateDB(){
  try {
      // Delete all existing documents in the collection
      await animal.deleteMany();
      
      // Create and save three instances to the database
      let instances = [
          { name: "Lion", type: 'Mammal', age: 20 },
          { name: "Eagle", type: 'Bird', age: 25 },
          { name: "Shark", type: 'Fish', age: 125 }
      ];

      for (let instanceData of instances) {
          let instance = new animal(instanceData);
          await instance.save();
          console.log("Instance saved:", instance);
      }

      console.log("Database seeded successfully");
  } catch (err) {
      console.error("Error seeding database:", err);
  }
}


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
