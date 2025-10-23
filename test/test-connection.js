import { Client } from 'pg';
import path from 'path';
import process from 'process';
import * as dotenv from 'dotenv';

// load the environmental variables
dotenv.config({
  path: path.resolve(process.cwd(), '../.env'),
  debug: true,
  encoding: 'UTF-8',
});

// var test
console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // localhost
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // default port
});

// const client = new Client({
//   user: 'gcwiley',
//   host: '35.245.54.38',
//   database: 'postgres', // localhost, 'your instance ip'
//   password: 'g6KJ51J84@1983',
//   port: 5432, // default postgresSQL port
// });

async function runDatabaseOperations() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Example: Create a table (if it does'nt exist)
    await client.query(
      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE
        );`
    );
    console.log('Table "users" ensured to exist.');

    // Example: insert data
    const insertResult = await client.query(
      'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *',
      ['Alice', 'alice@example.com']
    );
    console.log('Inserted user:', insertResult.rows[0]);

    // Example: Select data
    const selectResult = await client.query('SELECT * FROM users');
    console.log('All users:', selectResult.rows);
  } catch (error) {
    console.error('Database operation error:', error);
  } finally {
    await client.end();
    console.log('Disconnected from PostgreSQL database');
  }
}

runDatabaseOperations();
