const commentLogic = require('../services/comment-logic');

const createComment = async (req, res) => {
  try {
    const { parentCommentId, description, consumerId, postId } = req.body;
    const response = await commentLogic.createComment(
      parentCommentId,
      description,
      consumerId,
      postId
    );
    if (response) {
      res.status(200).send('Comment Submitted Successfully.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const updateComment = async (req, res) => {
  try {
    const { commentId, description } = req.body;
    const response = await commentLogic.updateCommentContent(
      commentId,
      description
    );
    if (response) {
      res.status(200).send('Comment Updated Successfully.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const response = await commentLogic.deleteComment(commentId);
    if (response) {
      res.status(200).send('Comment Deleted Successfully.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    const response = await commentLogic.getCommentsByPostId(postId);
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(500).send(response);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPostId,
};
