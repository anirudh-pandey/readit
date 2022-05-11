const express = require('express'),
app = express();

const commentController = require('../controllers/comment-controller');

app.get('/:postId', commentController.getCommentsByPostId);
app.post('/', commentController.createComment);
app.put('/', commentController.updateComment);
app.delete('/', commentController.deleteComment);

module.exports = app;