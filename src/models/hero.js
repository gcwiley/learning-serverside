// this is an example of how to use sequelize to create a data model
import { DataTypes } from 'sequelize';
import { initializeDatabase } from '../db/connect_to_sqldb.js';

// initialize the database and get the sequelize instance
const sequelize = await initializeDatabase();

const Hero = sequelize.define(
  'Hero',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    homePlanet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    superPower: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// sync the hero model
Hero.sync()
  .then(() => {
    console.log('Successfully synced the hero model');
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

// export the hero model
export { Hero };
