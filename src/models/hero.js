import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb.js';

// define the hero model
const Hero = sequelize.define(
   'Hero',
   {
      // id - unique identifier (UUID)
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      // name
      name: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
      },
      // age
      age: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      // date of birth
      dateOfBirth: {
         type: DataTypes.DATE,
         allowNull: false, // ensure the date is not null
         validate: {
            isDate: true, // ensures a valid date is given
         },
      },
      // home planet
      homePlanet: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // superpowers
      superPowers: {
         type: DataTypes.ARRAY(DataTypes.STRING), // array
         allowNull: false,
      },
      // biography
      biography: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      // profile picture
      pictureUrl: {
         type: DataTypes.STRING,
         allowNull: true,
         validate: {
            isUrl: true,
         },
      },
   },
   {
      timestamps: true,
      indexes: [
         {
            fields: ['name', 'homePlanet'],
         },
      ],
   }
);

export { Hero };
