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
      },
      // place of orgin
      placeOfOrgin: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // abilities
      abilities: {
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
