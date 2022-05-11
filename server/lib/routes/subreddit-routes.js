const express = require('express'),
app = express();

const subredditController = require('../controllers/subreddit-controller');

app.get('/:subredditName', subredditController.getSubreddit);
// app.get('/:subredditName/new', subredditController.getSubreddit);
// app.get('/:subredditName/top/:t', subredditController.getSubreddit);
app.post('/', subredditController.createSubreddit);
app.put('/:subredditId', subredditController.updateSubreddit);
app.delete('/:subredditId', subredditController.deleteSubreddit);

module.exports = app;