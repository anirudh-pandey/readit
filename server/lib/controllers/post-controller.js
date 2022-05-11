const postLogic = require('../services/post-logic');

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    const response = await postLogic.getPostById(postId);
    if (response && response.rowCount > 0) {
      res.status(200).send(response.rows[0]);
    } else {
      res.status(500).send(`Post with postId: ${postId} not found`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const createPost = async (req, res) => {
  try {
    const { title, consumerId, subredditId, description } = req.body;
    const response = await postLogic.createPost(
      title,
      consumerId,
      subredditId,
      description
    );
    if (response) {
      res.status(200).send('Post Created Successfully.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { description } = req.body;
    const response = await postLogic.updatePost(postId, description);
    if (response) {
      res.status(200).send('Post Updated Successfully.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const response = await postLogic.deletePost(postId);
    if (response) {
      res.status(200).send('Post Deleted Successfully.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

module.exports = {
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
