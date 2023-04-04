import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';


//ES2022 Modules fix for __dirname
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

//Import Passport Modules
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

//Define Authentication Strategy
let localStrategy = passportLocal.Strategy;

//Import User Model
import User from './models/user.js';

//Import Mongoose Module
import mongoose from 'mongoose';

//Configuration Module
import { Secret, MongoURI } from "../config/index.js";

//Import Routes
import indexRouter from '../app/routes/index.js';
import surveyRouter from '../app/routes/survey.js';
import answersRouter from '../app/routes/userSurvey.js'
import authRouter from '../app/routes/auth.js';
import resultsRouter from '../app/routes/results.js';

//Complete DB Config
mongoose.connect(MongoURI);
const db = mongoose.connection;

//Database Listeners
db.on('open', () => console.log('Connected to MongoDB'));
db.on('error', () => console.log('Mongo Connection Error'));

//Instantiate the Express Application
const app = express();

//Helper function for ejs templates that 
//returns a random RGB value "rgb(0-255, 0-255, 0-255)"
app.locals.randomRGB = () => {
  //Returns a number from 0 - 255
  const random = () => Math.floor(Math.random() * 256);
  return `rgba(${random()}, ${random()}, ${random()}, 0.6)`;
};

//EJS Setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//General Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

//Set up Express Session
app.use(session({
  secret: Secret,
  saveUninitialized: false,
  resave: false
}));

//Setup Flash
app.use(flash());

//Initialize Passport and Session
app.use(passport.initialize());
app.use(passport.session());

//Implement Auth Strategy
passport.use(User.createStrategy());

//Serialization and Deserialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/', surveyRouter);
app.use('/', answersRouter);
app.use('/', authRouter);
app.use('/', resultsRouter);
export default app;