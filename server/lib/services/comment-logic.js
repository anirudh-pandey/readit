const commentRepo = require('../data-access/comment-repository');
const { customAlphabet, urlAlphabet } = require('nanoid');
const cache = require('../common/cache');

const createComment = async (
  parentCommentId = null,
  description,
  consumerId,
  postId
) => {
  console.log(parentCommentId, description, consumerId, postId);
  const currentCommentId = customAlphabet(urlAlphabet, 10)();
  console.log(currentCommentId);
  let response = await commentRepo.createComment(
    currentCommentId,
    description,
    consumerId
  );
  console.log('Response:- ' + response + ' ' + parentCommentId);
  if (response) {
    response &= await commentRepo.createCommentRelation(
      currentCommentId,
      parentCommentId,
      postId
    );
  }
  return response;
};

const updateCommentContent = async (commentId, description) => {
  const response = await commentRepo.updateComment(commentId, description);
  return response;
};

const deleteComment = async (commentId) => {
  const response = await commentRepo.deleteComment(commentId);
  return response;
};

const getCommentsByPostId = async (postId) => {
  console.log(`postId = ${postId}`);
  const key = `post_comment_${postId}`;
  const comments = cache.getFromCache(key, () =>
    getNestedCommentDetails(postId)
  );
  return comments;
};

const getNestedCommentDetails = async (postId) => {
  let commentDetails = await commentRepo.getCommentsByPostId(postId);
  const result = [];
  commentDetails.forEach((comment) => {
    if (!comment.parent_comment_id) {
      result.push(comment);
      helper(result[result.length - 1], commentDetails);
    }
  });
  return result;
};

const helper = (currentCommentObj, commentDetails) => {
  if (!currentCommentObj) return;
  currentCommentObj.children = [];
  commentDetails.forEach((comment) => {
    if (currentCommentObj.id === comment.parent_comment_id) {
      currentCommentObj.children.push(comment);
      console.log(
        currentCommentObj.children[currentCommentObj.children.length - 1]
      );
      helper(
        currentCommentObj.children[currentCommentObj.children.length - 1],
        commentDetails
      );
    }
  });
};

module.exports = {
  createComment,
  updateCommentContent,
  deleteComment,
  getCommentsByPostId,
};
