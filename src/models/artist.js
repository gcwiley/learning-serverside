import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb';

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
      unique: true,
      validate: { notEmpty: true },
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
      validate: { isUrl: true },
    },
  },
  {
    timestamps: true,
    tableName: 'Artists',
    indexes: [{ fields: ['name'] }],
  }
);

export { Artist };
