import { Router } from 'express';

const router = new Router();

// post controller functions
import { newPost, getPosts, getPostById, updatePostById, deletePostById, getRecentlyCreatedPosts, getPostCount } from '../controllers/post.js';

// route handler to create a new album - NEW POST
router.post('/api/posts', newPost);

// route handler for fetching all albums - GET ALL POSTS
router.get('/api/posts', getPosts);

// route handler to fetch individual post by ID
router.get('/api/posts/:id', getPostById);

// route handle to update an existing album - UPDATE POST
router.patch('/api/posts/:id', updatePostById);

// route handle to delete an post by ID - DELETE POST
router.delete('/api/posts/:id', deletePostById);

// router hanlder to count all posts in database - COUNT ALL POSTS
router.get('/api/posts/count', getPostCount);

// route handler to get the last 5 albums created - GET 5 RECENT POSTS
router.get('/api/posts/recent', getRecentlyCreatedPosts);

// export the router
export { router as postRouter };
