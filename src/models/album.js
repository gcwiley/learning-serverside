import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb.js';

// define the album model
const Album = sequelize.define(
   'Album',
   {
      title: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      artist: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      releaseDate: {
         type: DataTypes.DATE,
         allowNull: false, // ensure that date is not null
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
         type: DataTypes.STRING(1000),
         allowNull: false,
      },
   },
   {
      timestamps: true,
      indexes: [
         {
            fields: ['artist', 'genre'], // adds a composite index on the 'artist' and 'genre' columns
         },
      ],
   }
);

// sync the model with the database
(async () => {
   try {
      await Album.sync();
      console.log('Album model synced successfully');
   } catch (error) {
      console.error('Error syncing Album model:', error);
   }
})();

// export the album model
export { Album };
