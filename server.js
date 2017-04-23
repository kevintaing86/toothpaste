/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const sass = require('node-sass-middleware');
const multer = require('multer');
const exphbs = require("express-handlebars");
const favicon = require('serve-favicon');


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const entryController = require('./controllers/entry');
const notificationsController = require('./controllers/notifications');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);

/**
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');
 */

app.use(compression());
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

/**
 * Primary app routes.
 */
app.use(express.static(path.join(__dirname, 'toothpaste-app/build/default'), { maxAge: 31557600000 }));
app.get('/entries', entryController.getEntries);
app.get('/notifications', notificationsController.test);
app.post('/entry', entryController.postNewEntry);


 /**
 * Start Express server.
 */
app.listen(process.env.PORT || 3000, () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('[✓ OK]'), app.get('port'), app.get('env'));
  console.log('Press CTRL-C to stop\n');
});


module.exports = app;
