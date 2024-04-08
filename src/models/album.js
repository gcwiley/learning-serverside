// this is an example of how to use sequelize to create a model

import { DataTypes } from 'sequelize';

// import the sequelize instance
import { sequelize } from '../db/db.js';

// create the Album model
const Album = sequelize.define('Album', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.STRING,
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
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// export the Album model
export { Album };