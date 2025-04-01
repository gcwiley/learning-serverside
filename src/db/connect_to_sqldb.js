// THIS IS AN EXAMPLE OF HOW TO CONNECT TO A SQL DB RUNNING ON AZURE CLOUD

import path from 'path';
import process from 'process';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

// load the environment variables
dotenv.config({
   path: path.resolve(process.cwd(), '.env'),
   debug: true,
   encoding: 'UTF-8',
});

// validate required environment variables
const database = process.env.PGDATABASE;
const username = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const host = process.env.PGHOST;
const port = process.env.PGPORT;

// checks for presence of required environment variables and throws error if any are missing.
if (!database || !username || !password || !host || !port) {
   throw new Error('Missing one or more required environment variables for database connection.');
}

// initialize sequelize instance
const initializeDatabase = async () => {
   try {
      const sequelize = new Sequelize(database, username, password, {
         host: host,
         dialect: 'postgres',
         dialectOptions: {
            ssl: true,
         },
         port: port,
         logging: false, // disable logging for production
      });

      await sequelize.authenticate();
      console.log(
         chalk.magentaBright(
            '\n',
            `Connection to the SQL database ${database} has been established successfully.`,
            '\n'
         )
      );
      return sequelize;
   } catch (error) {
      console.error(chalk.red('\n', `Unable to connect to the database: ${error.message}`, '\n'));
      throw error;
   }
};

// export the sequelize instance
export { initializeDatabase };
