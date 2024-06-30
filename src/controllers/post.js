// this is an example of a controller that uses sequelize to read/write to a SQL database

import chalk from 'chalk';
import { Post } from '../models/post.js';

// function to create a new post - NEW POST
export const newPost = async (req, res) => {
  try {
    await Post.create(req.body);
    res.status(201).send();
  } catch (error) {
    res.status(400).send(error);
    // if error, log to console
    console.error('\n', chalk.red(error), '\n');
  }
};

// function to fetch all posts from database - ALL POSTS
export const getPosts = async (req, res) => {
  try {
    // sorts be date published 
    const posts = await Post.findAll({
      order: [['datePublished', 'DESC']],
    });

    // if no posts are found
    if (!posts) {
      return res.status(404).send('No Posts found');
    }

    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error('\n', chalk.bold.red(error), '\n');
  }
};

// function to fetch invidual post by id = POST BY ID
export const getPostById = async (req, res) => {
  // converts id string to an integer
  const id = parseInt(req.params.id);

  try {
    const post = await Post.findByPk(id);

    // if post is not found
    if (!post) {
      return res.status(404).send('Post not found');
    }

    res.send(post);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error('\n', chalk.bold.red(error), '\n');
  }
};

// function to update post by id - UPDATE POST
export const updatePostById = async (req, res) => {
  // convert string to integer
  const id = parseInt(req.params.id);

  try {
    const post = await Post.update(req.body, {
      where: {
        id: id,
      },
    });

    if (!post) {
      res.status(404).send('No Post found');
    }

    res.send(post);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error('\n', chalk.bold.red(error), '\n');
  }
};

// function to delete post by id - DELETE POST
export const deletePostById = async (req, res) => {
  // convert string to integer
  const id = parseInt(req.params.id);

  try {
    const post = await Post.destroy({
      where: {
        id: id,
      },
    });

    // if no post is found
    if (!post) {
      res.status(404).send();
    }

    res.send(post);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error('\n', chalk.bold.red(error), '\n');
  }
};

// function to count all posts in database - POST COUNT
export const getPostCount = async (req, res) => {
  try {
    const postCount = await Post.count({});

    // if unable to get post count
    if (!postCount) {
      res.status(404).send();
    }

    res.send(postCount);
  } catch (error) {
    res.status(500).send(error);
    // log error to console
    console.error('\n', chalk.red(error), '\n');
  }
};

// function to get the 5 most recently created posts - RECENT POSTS
export const getRecentlyCreatedPosts = async (req, res) => {
  try {
    const recentPosts = await Post.findAll({
      order: [['createdAt', 'DESC']],
      limit: 10,
    });

    if (!recentPosts) {
      return res.status(404).send('No posts found');
    }

    res.send(recentPosts);
  } catch (error) {
    res.status(500).send(error);
    // if error, log to console
    console.error('\n', chalk.red(error), '\n');
  }
};
