import { Post } from '../models/post.js';
import { Op } from 'sequelize';

// function to create a new post - NEW POST
export const newPost = async (req, res) => {
   try {
      // builds a new model instance and calls save on it
      const post = await Post.create({
         title: req.body.title,
         author: req.body.author,
         body: req.body.body,
         category: req.body.category,
         favorite: req.body.favorite,
         date: new Date(req.body.date),
      });
      res.status(201).json({ success: true, message: 'Successfully created new post.', data: post });
   } catch (error) {
      console.error('Error creating post:', error);
      res.status(400).json({
         success: false,
         message: 'Error creating post.',
         error: error.message,
      });
   }
};

// function to fetch all posts from database - GET ALL POSTS
export const getPosts = async (req, res) => {
   try {
      // retrieve all posts ordered by date (most recent first_
      const posts = await Post.findAll({
         order: [['releaseDate', 'DESC']], // order posts by date
      });

      // if no posts are found, handle the empty result
      if (posts.length === 0) {
         return res.status(404).json({ message: 'No posts found.' });
      }

      // send the list of posts to the client - fix this
      res.status(200).json(posts);
   } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching posts.',
         error: error.message,
      });
   }
};

// function to fetch individual post by ID - GET POST BY ID
export const getPostById = async (req, res) => {
   try {
      // find the post by primary key (assumes 'id' is the primary key in the post model)
      const post = await Post.findByPk(req.params.id);

      // if post is not found, handle the empty result
      if (!post) {
         return res
            .status(404)
            .json({ success: false, message: 'No post with that ID was found.' });
      }

      // send post data to client - fix this
      res.status(200).json(post);
   } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching post.',
         error: error.message,
      });
   }
};

// function to update a post by id - UPDATE POST fix this
export const updatePostById = async (req, res) => {
   try {
      const post = await Post.findByPk(req.params.id);

      if (!post) {
         return res.status(404).json({ message: 'No post with that ID was found.' });
      }
      const updatedPost = await post.update({
         title: req.body.title,
         author: req.body.author,
         body: req.body.body,
         category: req.body.category,
         favorite: req.body.favorite,
         date: new Date(req.body.date),
      });

      res.status(200).json(updatedPost);
   } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({
         success: false,
         message: 'Error updating post.',
         error: error.message,
      });
   }
};

// function to delete a post by ID - DELETE POST fix this
export const deletePostById = async (req, res) => {
   try {
      const post = await Post.findByPk(req.params.id);

      // if no post is found
      if (!post) {
         res.status(404).json({ success: false, message: 'No post with that ID was found.' });
      }

      await post.destroy();
      res.status(200).json({ success: true, message: 'Post deleted successfully.' });
   } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({
         success: false,
         message: 'Error deleting post.',
         error: error.message,
      });
   }
};

// function to count all posts - POST COUNT
export const getPostCount = async (req, res) => {
   try {
      const postCount = await Post.count({});

      // send post count to client - fix this
      res.status().json(postCount);
   } catch (error) {
      console.error('Error fetching post count:', error);
      res.status(500).json({
         success: false,
         message: 'Error fetching post count.',
         error: error.message,
      });
   }
};

// function to get the 5 most recently create posts - GET RECENT POSTS
export const getRecentlyCreatedPosts = async (req, res) => {
   try {
      const mostRecentPosts = await Post.findAll({}).limit(5);

      // if no recent posts are found
      if (!mostRecentPosts) {
         return res.status(404).send();
      }
      // fix 
      res.send(mostRecentPosts);
   } catch (error) {
      res.status(500).send(error);
      console.error(error);
   }
};

// function to search for post by title, date, or category - SEARCH POSTS
export const searchPosts = async (req, res) => {
   const { query } = req.query;

   // validate query parameters
   if (!query) {
      return res
         .status(400)
         .json({ success: false, message: 'Query parameter is required for searching posts.' });
   }

   try {
      const posts = await Post.findAll({
         where: {
            // uses the Op.or operator to search for albums that match any of the search criteria.
            [Op.or]: [
               // uses the 'Op.iLike' operator for case-insensitive search
               { title: { [Op.iLike]: `%${query}%` } },
               { date: { [Op.iLike]: `%${query}%` } },
               { category: { [Op.iLike]: `%${query}%` } },
            ],
         },
      });

      if (posts.length === 0) {
         return res
            .status(404)
            .json({ success: false, message: 'No posts found matching your search query.' });
      }

      res.status(200).json({ success: true, message: 'search results', data: posts });
   } catch (error) {
      console.error('Error searching posts:', error);
      res.status(500).json({
         success: false,
         message: 'Error searching posts.',
         error: error.message,
      });
   }
};
