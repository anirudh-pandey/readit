const db = require('../../db/index');

const getPostById = async (id) => {
  const query = `Select * from post where id = $1`;
  const response = await db.query(query, [id]);
  console.log(response);
  return response;
};

// TODO: need to properly handle all type of errors, learn about it.
// TODO: need to send obj with all params.
const createPost = async (
  postId,
  title,
  consumerId,
  subredditId,
  slug,
  description
) => {
  const query = `INSERT INTO post (id, title, consumer_id, subreddit_id, slug, description, created_on)
  VALUES ($1, $2, $3, $4, $5, $6, NOW())`;
  const values = [postId, title, consumerId, subredditId, slug, description];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const updatePost = async (postId, description) => {
  const query = `UPDATE post SET description = $1, updated_on = NOW() WHERE id = $2`;
  const values = [description, postId];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const deletePost = async (postId) => {
  const query = `DELETE FROM post WHERE id = $1`;
  const values = [postId];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const isPostWithSameIdPresent = async (postId) => {
  const query = `Select * from post where id = $1`;
  const response = await db.query(query, [postId]);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0; // TODO: need to put it in method to keep clean.
};

module.exports = {
  getPostById,
  createPost,
  updatePost,
  deletePost,
  isPostWithSameIdPresent,
};
