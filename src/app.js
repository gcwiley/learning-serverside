import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// get the current file name
const __filename = fileURLToPath(import.meta.url);
// get the current directory name
const __dirname = path.dirname(__filename);

import express from 'express';
import logger from 'morgan';

import { applicationDefault, initializeApp } from 'firebase-admin/app';

// import the routers
import { heroRouter } from './routes/hero.js';
import { albumRouter } from './routes/album.js';

// Initialize the Firebase SDK
initializeApp({
  credential: applicationDefault(),
});

// create an express instance
const app = express();

// set the port
const port = process.env.PORT || 3000;

// allow static access to the angular client side folder
app.use(express.static(path.join(__dirname, '/dist/learning-angular-material')));

// automatically parse incoming JSON to an object so we can access it in our request handlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a logger middleware
app.use(logger('dev'));

// register the routers
app.use(heroRouter);
app.use(albumRouter);

// handle all other routes with angular app - returns angular app
app.get('*', (req, res) => {
  // send back the angular index.html file
  res.sendFile(path.join(__dirname, './dist/learnng-angular-material', 'index.html'));
});

// start the server
app.listen(port, () => {
  console.log(chalk.blue('\n', `Successfully started server running on port ${port}`, '\n'));
});
