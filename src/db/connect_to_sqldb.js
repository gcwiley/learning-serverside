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

// get required environment variables
const database = process.env.PGDATABASE;
const username = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const host = process.env.PGHOST;
const port = process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432;

// checks for presence of required environment variables and throws error if any are missing.
if (!database || !username || !password || !host || !port) {
   throw new Error('Missing one or more required environment variables for database connection.');
}

// create the sequelize instance with database name, username, and password
const sequelize = new Sequelize(database, username, password, {
   host,
   dialect: 'postgres',
   dialectOptions: {
      ssl: true,
   },
   port,
   pool: {
      max: 5, // max number of connections
      min: 0, // min number of connections
      acquire: 30000,
      idle: 10000,
   },
});

// define an async function to test the database connection
async function testConnection() {
   try {
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
}

// call the function to test the connection
testConnection();

// export the sequelize instance
export { sequelize };
