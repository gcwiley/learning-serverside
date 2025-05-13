import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb.js';

// define the album model
const Album = sequelize.define(
   'Album',
   {
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate: {
            notEmpty: true,
         },
      },
      artist: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
      },
      releaseDate: {
         type: DataTypes.DATE,
         allowNull: false, // ensures the date is not null
         validate: {
            isDate: true, // ensures a valid date is given
         },
      },
      label: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      studio: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      genre: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      summary: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
   },
   {
      timestamps: true,
      tableName: 'albums',
      underscored: true,
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

// export the album model
export { Album };
