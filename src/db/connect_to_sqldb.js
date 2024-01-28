// THIS IS AN EXAMPLE OF HOW TO CONNECT TO A SQL DB RUNNING ON AZURE CLOUD

import path from 'path';
import process from 'process';
import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import chalk from 'chalk';

// load environment variables
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
  debug: true,
});

// create the sequelize instance
const sequelize = new Sequelize(
  `postgres://gcwiley:${process.env.PASSWORD}@postgre-sql-server-wiley.postgres.database.azure.com/postgres?sslmode=require`,
  {
    dialect: 'postgres',
  }
);

// get the name of the database from the .env file
const dbName = process.env.DATABASE_NAME;

// tests the connection by trying to authenicate
try {
  await sequelize.authenticate();
  console.log(chalk.green('\n', `Connection to the database ${dbName}has been established successfully.`, '\n'));
} catch (error) {
  console.error(chalk.red(`Unable to connect to the database: ${error}`));
}

// export the sequelize instance
export { sequelize };
