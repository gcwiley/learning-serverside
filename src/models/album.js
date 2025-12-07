import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb.js';

// define the album model
const Album = sequelize.define(
   'Album',
   {
      // id - unique identifier (UUID)
      // 
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
      // artist - foreign key
      artistId: {
         type: DataTypes.UUID,
         allowNull: false,
         references: {
            model: 'Artists',
            key: 'id'
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE'
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
      // genre (array) - NOTE: This requires PostgreSQL
      genre: {
         type: DataTypes.ARRAY(DataTypes.STRING),
         allowNull: false,
         defaultValue: [],
         validate: {
            notEmpty: true,
         },
      },
      // summary
      summary: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      // cover image URL
      coverImageUrl: {
         type: DataTypes.STRING,
         allowNull: true,
         validate: {
            isUrl: true, // adds validation to ensure string is a URL
         }
      },
   },
   {
      timestamps: true,
      tableName: 'Albums',
      indexes: [
         {
            fields: ['artistId', 'genre'],
         },
         {
            fields: ['releaseDate'],
         },
         {
            fields: ['artistId'],
         },
         {
            fields: ['genre'],
         },
      ],
   }
);

export { Album };
