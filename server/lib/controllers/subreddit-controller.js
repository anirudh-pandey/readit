const subredditLogic = require('../services/subreddit-logic');

const getSubreddit = async (req, res) => {
  try {
    const { subredditName } = req.params;
    console.log(req.params);
    const response = await subredditLogic.getSubreddit(subredditName);
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const createSubreddit = async (req, res) => {
  try {
    const { name, description } = req.body;
    const response = await subredditLogic.createSubreddit(name, description);
    // TODO: need to update moderator table.
    if (response) {
      res.status(200).send('Subreddit Created Successfully.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const updateSubreddit = async (req, res) => {
  try {
    const { subredditId } = req.params;
    const { description } = req.body;
    console.log(subredditId, description);
    const response = await subredditLogic.updateSubreddit(subredditId, description);
    if (response) {
      res.status(200).send('Subreddit Updated Successfully.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const deleteSubreddit = async (req, res) => {
  try {
    const { subredditId } = req.params;
    const response = await subredditLogic.deleteSubreddit(subredditId);
    if (response) {
      res.status(200).send('Subreddit Deleted Successfully.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

module.exports = {
  getSubreddit,
  createSubreddit,
  updateSubreddit,
  deleteSubreddit,
};
