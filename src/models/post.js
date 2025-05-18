import { DataTypes } from 'sequelize';
import { sequelize } from '../db/connect_to_sqldb.js';

// define the post model
const Post = sequelize.define(
   'Post',
   {
      // add id field
      // title
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      // author
      author: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // body
      body: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      // category
      category: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // favorite
      favorite: {
         type: DataTypes.BOOLEAN,
         defaultValue: false, // provide a default value
      },
      // date
      date: {
         type: DataTypes.DATE,
         allowNull: false, // ensures the date is not null
         validate: {
            isDate: true, // ensures a valid date is given
         },
      },
   },
   {
      timestamps: true,
      indexes: [
         {
            fields: ['author', 'category'], // adds a composite index on the 'author' column
         },
         {
            fields: ['date'], // index on date for efficient querying by date
         },
      ],
   }
);

// export the post model
export { Post };
