// this is an example of how to use sequelize to create a data model
import { DataTypes } from 'sequelize';
import { initializeDatabase } from '../db/connect_to_sqldb.js';

// initialize the database and get the sequelize instance
const sequelize = await initializeDatabase();

// define the album model
const Album = sequelize.define(
   'Album',
   {
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false,
      },
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
         allowNull: false,
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
