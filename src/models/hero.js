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
      // alter ego
      alterEgo: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
            len: [2, 100],
         },
      },
      // place of origin
      placeOfOrigin: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // abilities
      abilities: {
         type: DataTypes.ARRAY(DataTypes.STRING), // array
         allowNull: false,
         validate: {
            notEmpty: true,
         }
      },
      // biography
      biography: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      // profile picture URL
      pictureUrl: {
         type: DataTypes.STRING,
         allowNull: true, // not required, as it might be added later or not exist for all heros
      },
   },
   {
      timestamps: true,
      indexes: [
         {
            fields: ['name', 'placeOfOrigin'],
         },
         {
            fields: ['alterEgo'],
         },
      ],
   }
);

export { Hero };
