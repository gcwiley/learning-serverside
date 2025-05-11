import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb.js';

// define the hero model
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
         type: DataTypes.STRING(1000),
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

// sync the hero model
(async () => {
   try {
      await Hero.sync();
      console.log('Hero model synced successfully');
   } catch (error) {
      console.error('Error syncing Hero model:', error);
   }
})();

// export the hero model
export { Hero };
