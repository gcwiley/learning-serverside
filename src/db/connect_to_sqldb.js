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
});

// env variables
const database = process.env.PGDATABASE;
const username = process.env.PGUSER;
const password = process.env.PGPASSWORD;
const host = process.env.PGHOST;
const port = process.env.PGPORT;

// create the sequelize instance
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
  },
  port: port,
});

// tests the database connection by trying to authenicate
try {
  await sequelize.authenticate();
  console.log(
    chalk.magentaBright(
      '\n',
      `Connection to the SQL database ${database} has been established successfully.`,
      '\n'
    )
  );
} catch (error) {
  console.error(
    chalk.red('\n', `Unable to connect to the database: ${error}`, '\n')
  );
}

// export the sequelize instance
export { sequelize };
