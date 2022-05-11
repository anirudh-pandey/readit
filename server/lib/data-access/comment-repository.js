const db = require('../../db/index');

const createComment = async (
  currentCommentId,
  description,
  consumerId
) => {
  const query = `INSERT INTO comment (id, description, created_on, consumer_id)
   VALUES ($1, $2, NOW(), $3)`;
  const values = [currentCommentId, description, consumerId];
  console.log(values);
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const createCommentRelation = async (currentCommentId, parentCommentId, postId) => {
  const query = `INSERT INTO comment_relation (comment_id, parent_comment_id, 
    post_id) VALUES ($1, $2, $3)`;
  const values = [currentCommentId, parentCommentId, postId];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const updateComment = async (commentId, description) => {
  const query = `UPDATE comment SET description = $1, updated_on = NOW() WHERE id = $2`;
  const values = [description, commentId];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const deleteComment = async (commentId) => {
  const query = `UPDATE comment SET is_active = true, updated_on = NOW() WHERE id = $1`;
  const values = [commentId];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const getCommentsByPostId = async (postId) => {
  const query = `SELECT C.id,
                        C.description, 
                        C.created_on, 
                        C.updated_on, 
                        C.consumer_id, 
                        C.is_active, 
                        CR.parent_comment_id
                      FROM 
                        comment as C
                      INNER JOIN
                        comment_relation as CR
                      ON
                        C.id = CR.comment_id
                      WHERE
                        CR.post_id = $1;`
  // const query = `SELECT comment_id FROM comments_under_post WHERE post_id = $1`;
  const values = [postId];
  console.log(values);
  const response = await db.query(query, values);
  console.log(response);
  return response.rows;
};

//Note that = ANY is another way to write IN (...), but unlike IN (...) it will work how you'd expect when you pass an array as a query parameter.
const getCommentsByCommentIds = async (commentIds) => {
  const query = `SELECT * FROM comment WHERE id = ANY ($1)`;
  const values = [commentIds];
  const response = await db.query(query, values);
  console.log(response);
  return response.rows;
};

module.exports = {
  createComment,
  createCommentRelation,
  updateComment,
  deleteComment,
  getCommentsByPostId,
  getCommentsByCommentIds,
};
