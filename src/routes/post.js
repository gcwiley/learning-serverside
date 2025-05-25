import { Router } from 'express';

const router = new Router();

// post controller functions
import { newPost, getPosts, getPostById, updatePostById, deletePostById, getRecentlyCreatedPosts, getPostCount } from '../controllers/post.js';

// route handler to create a new album - NEW POST
router.post('/api/posts', newPost);

// route handler for fetching all albums - GET ALL POSTS
router.get('/api/posts', getPosts);

// route handler to fetch an individual post - GET POST BY ID
router.get('/api/posts/:id', getPostById);

// route handler to update an existing post - UPDATE POST BY ID
router.patch('/api/posts/:id', updatePostById);

// route handler to delete a post by ID - DELETE POST BY ID
router.delete('/api/posts/:id', deletePostById);

// router hanlder to count all posts in database - COUNT ALL POSTS
router.get('/api/posts/count', getPostCount);

// route handler to get the last 5 posts created - GET 5 RECENT POSTS
router.get('/api/posts/recent', getRecentlyCreatedPosts);

export { router as postRouter };
