import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import admin from 'firebase-admin';
import express from 'express';
import logger from 'morgan';

// import database connection and helper
import { sequelize, connectToDatabase } from './db/connect_to_sqldb.js';

// import models ( ensure they are registered with sequelize)
// import index.js to load models AND their associations
import './models/index.js';

// import the routers
import { heroRouter } from './routes/hero.js';
import { albumRouter } from './routes/album.js';
import { postRouter } from './routes/post.js';

// import the credentials
import { serviceAccount } from '../credentials/service-account.js';

// --- CONFIGURATION ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3000;
const angularDistPath = path.join(
  __dirname,
  './dist/learning-angular-material/browser'
);

// --- FIREBASE INIT ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: `${serviceAccount.project_id}.appspot.com`,
});

const bucket = admin.storage().bucket();

// --- EXPRESS SETUP ---
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files (angular)
app.use(express.static(angularDistPath));

// middleware: attach firebase bucket to request
app.use((req, res, next) => {
  req.bucket = bucket;
  next();
});

// --- ROUTES ---
app.use(heroRouter);
app.use(albumRouter);
app.use(postRouter);

// global error handler - express requires 4 args for error handlers
app.use((error, req, res, next) => {
  console.error(chalk.red('Server Error:', error.stack));
  // ensure we don't try to send a response if one was already sent
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(500)
    .json({ error: 'Internal Server Error', message: error.message });
});

// catch all route: send angular index.html for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(angularDistPath, 'index.html'));
});

// --- STARTUP SEQUENCE ---
const startServer = async () => {
  try {
    // 1. establish DB connection
    await connectToDatabase();

    // 2. sync models (create tables if missing)
    // note: in production, use Migrations instead of sync()
    await sequelize.sync({ alter: true });
    console.log(chalk.green('Database models synced successfully.'));

    // 3. start listening
    const server = app.listen(port, () => {
      console.log(chalk.blueBright(`\n Server running on port ${port}\n`));
    });

    // 4. graceful shutdown
    process.on('SIGINT', async () => {
      console.log(chalk.yellow('Gracefully shutting down...'));
      await sequelize.close();
      server.close(() => {
        console.log(chalk.green('Server closed'));
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(chalk.red('Failed to start server:', error));
    process.exit(1);
  }
};

startServer();
