import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb.js';

// define the album model
const Album = sequelize.define(
   'Album',
   {
      // id - unique identifier (UUID)
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
      },
      // title
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notEmpty: true,
         },
      },
      // artist
      artist: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
      },
      // release date
      releaseDate: {
         type: DataTypes.DATE,
         allowNull: false, // ensures the date is not null
         validate: {
            isDate: true, // ensures a valid date is given
         },
      },
      // label
      label: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // studio
      studio: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // studio (array)
      genre: {
         type: DataTypes.ARRAY(DataTypes.STRING),
         allowNull: false,
         validate: {
            notEmpty: true,
         }
      },
      // summary
      summary: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      // cover image
      coverImageUrl: {
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
            fields: ['artist', 'genre'], // adds a composite index on the 'artist' and 'genre' columns
         },
         {
            fields: ['releaseDate'], // index on date for efficient querying by release date
         },
      ],
   }
);

export { Album };
