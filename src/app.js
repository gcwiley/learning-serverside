import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import admin from 'firebase-admin';
import { sequelize } from './db/connect_to_sqldb.js';
import multer from 'multer';

// import models
import './models/album.js';
import './models/hero.js';
import './models/post.js';

// get the current file name
const __filename = fileURLToPath(import.meta.url);
// get the current directory name
const __dirname = path.dirname(__filename);

import express from 'express';
import logger from 'morgan';

// import the credentials
import { serviceAccount } from '../credentials/service-account.js';

// initialize the firebase SDK
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
});

// initialize firebase storage
const bucket = admin.storage().bucket; // get the default storage bucket

// configure multer for file uploads
const upload = multer({
   storage: multer.memoryStorage(), // store files in memory
   limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
   },
});

// this will create the table if it does not exist (and do nothing if it does)
sequelize
   .sync()
   .then(() => {
      console.log('Database & tables synced.');
   })
   .catch((error) => {
      console.error('Error syncing database:', error);
   });

// import the routers
import { heroRouter } from './routes/hero.js';
import { albumRouter } from './routes/album.js';
import { postRouter } from './routes/post.js';

// create an express instance
const app = express();

// set the port
const port = process.env.PORT || 3000;

// allow static access to the angular client side folder
app.use(express.static(path.join(__dirname, '/dist/learning-angular-material/browser')));

// automatically parse incoming JSON to an object so we can access it in our request handlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a logger middleware
app.use(logger('dev'));

// make the firebase storage bucket and upload middleware available to request handlers
app.use((req, res, next) => {
   req.bucket = bucket; // attach the firebase storage bucket
   next();
});

// register the routers
app.use(heroRouter);
app.use(albumRouter);
app.use(postRouter);

// global error handler - to catch and response to error gracefully
app.use((error, req, res) => {
   console.error(error.stack);
   res.status(500).json({ error: 'Internal Server Error' });
});

// handle all other routes with angular app - returns angular app
app.get('*', (req, res) => {
   // send back the angular index.html file
   res.sendFile(path.join(__dirname, './dist/learning-angular-material/browser', 'index.html'));
});

// start the server
app.listen(port, () => {
   console.log(chalk.blue('\n', `Successfully started server running on port ${port}`, '\n'));
});

// export upload middleware for use in routes
export { upload };
