// this is an example of how to use sequelize to create a data model
import { DataTypes } from 'sequelize';

// import the sequelize instance
import { sequelize } from '../db/connect_to_sqldb.js';

const Hero = sequelize.define(
  'Hero',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
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
