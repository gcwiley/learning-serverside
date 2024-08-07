// this is an example of how to use sequelize to create a data model
import { DataTypes } from 'sequelize';

// import the sequelize instance
import { sequelize } from '../db/connect_to_sqldb.js';

// create the Album model
const Album = sequelize.define(
  'Album',
  {
    id: {
      type: DataTypes.INTEGER,
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

// sync the album model
Album.sync()
  .then(() => {
    console.log('Successfully synced the album model');
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

// export the album model
export { Album };
