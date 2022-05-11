const express = require('express'),
app = express();
const consumerRoutes = require('./cosumer-routes');
const postRoutes = require('./post-routes');
const subredditRoutes = require('./subreddit-routes');
const commentRoutes = require('./comment-routes');

app.use('/consumer', consumerRoutes);
app.use('/post', postRoutes);
app.use('/subreddit', subredditRoutes);
app.use('/comment', commentRoutes);

module.exports = app;