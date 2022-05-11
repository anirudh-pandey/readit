const express = require('express'),
app = express();

const postController = require('../controllers/post-controller');

app.get('/:postId', postController.getPostById);
app.post('/', postController.createPost);
app.put('/:postId', postController.updatePost);
app.delete('/:postId', postController.deletePost);

module.exports = app;