const db = require('../../db/index');

const getSubreddit = async (lowerCaseName, name, description) => {
  const query = `SELECT id, name, display_name, description, created_on 
  FROM subreddit WHERE name = $1`;
  const values = [lowerCaseName];
  const response = await db.query(query, values);
  console.log(response);
  if(response && response.rowCount && response.rowCount > 0) {
    return response.rows[0];
  } else {
    return false;
  }
};

// TODO: need to properly handle all type of errors, learn about it.
// TODO: need to send obj with all params.
const createSubreddit = async (lowerCaseName, name, description) => {
  const query = `INSERT INTO subreddit (name, display_name, description, created_on)
  VALUES ($1, $2, $3, NOW())`;
  const values = [lowerCaseName, name, description];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const updateSubreddit = async (subredditId, description) => {
  const query = `UPDATE subreddit SET description = $1 WHERE id = $2`;
  const values = [description, subredditId];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const deleteSubreddit = async (subredditId) => {
  const query = `DELETE FROM subreddit WHERE id = $1`;
  const values = [subredditId];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

module.exports = {
  getSubreddit,
  createSubreddit,
  updateSubreddit,
  deleteSubreddit,
};
