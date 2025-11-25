import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb';

// define the image model
const Image = sequelize.define(
  'Image',
  {
    // id - unique identifier (UUID)
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // name - orginal file name
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // url - where the image is stored
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: true,
      },
    },
    // mimetype = (e.g. image/jpeg)
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // size = file size in bytes
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    // description - original description or caption
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // optional field for user info
    uploadedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export { Image };
