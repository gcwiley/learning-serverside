import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb.js';

// define the hero model
const Hero = sequelize.define(
   'Hero',
   {
      name: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
      },
      age: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      dateOfBirth: {
         type: DataTypes.DATE,
         allowNull: false, // ensure the date is not null
         validate: {
            isDate: true, // ensures a valid date is given
         },
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
         type: DataTypes.TEXT,
         allowNull: false,
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

// export the hero model
export { Hero };
