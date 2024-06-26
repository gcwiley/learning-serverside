import { Router } from 'express';

// create a new router
const router = new Router();

// import the post controller functions
import {
  newPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
  getPostCount,
  getRecentlyCreatedPosts,
} from '../controllers/post.js';

// route handler to create a new post - NEW POST
router.post('/api/posts', newPost);

// route handler for fetching all posts - GET ALL POSTS
router.get('/api/posts', getPosts);

// route handler to fetch individual posts by ID
router.get('/api/posts/:id', getPostById);

// route handle to update an existing post - UPDATE POST
router.patch('/api/posts/:id', updatePostById);

// route handle to delete an post by ID - DELETE POST
router.delete('/api/posts/:id', deletePostById);

// router hanlder to count all albums in database - COUNT ALL POSTS
router.get('/api/post-count', getPostCount);

// route handler to get the last 5 albums created - GET 5 RECENT POSTS
router.get('/api/recent-posts', getRecentlyCreatedPosts);

// export the router
export { router as postRouter };
