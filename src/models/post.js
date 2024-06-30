import { DataTypes } from 'sequelize';

// import the sequelize instance
import { sequelize } from '../db/connect_to_sqldb.js';

// create the post model
const Post = sequelize.define(
  'Post',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datePublished: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// sync the post model
Post.sync();

// export the post model
export { Post };
