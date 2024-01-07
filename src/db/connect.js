import process from 'process';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// load environment variables
dotenv.config({
  path: '/Users/gregwiley/Desktop/learning-web-development/learning-serverside/.env',
  debug: true,
});

//  get the connection string from the .env file
const uri = process.env.COSMOS_CONNECTION_STRING;

// get the name of the database from the .env file
const dbName = process.env.DATEBASE_NAME;

async function connect() {
  try {
    // open mongoose's default connection to mongodb
    await mongoose.connect(uri, { dbName: dbName });
    await mongoose.set('strictQuery', false);
    console.log(`Successfully connected to the database - ${dbName}`);
  } catch (error) {
    console.log(`Unable to connect to the ${dbName} database: ${error}`);
  }
}

// export the function
export { connect };
