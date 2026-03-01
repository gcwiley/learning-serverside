import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb.js';

const Artist = sequelize.define(
  'Artist',
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
      allowNull: false, // explicity disallow null
      unique: true,
      validate: {
        notEmpty: { msg: 'Artist name cannot be empty.' },
      },
    },
    // biography
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // website of artist
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: { msg: 'Website must be a valid URL.' },
      },
    },
  },
  {
    timestamps: true,
    tableName: 'Artists',
    indexes: [{ fields: ['name'] }],
  }
);

export { Artist };
