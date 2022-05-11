const db = require('../../db/index');

// TODO: need to properly handle all type of errors, learn about it.
const registerConsumer = async (name, display_name, password, email) => {
  if(await isUserAlreadyPresent(name)) {  //TODO: move to logic.
    return false;
  }
  const query = `INSERT INTO consumer (name, display_name, password, email, created_on)
  VALUES ($1, $2, $3, $4, NOW())`;
  const values = [name, display_name, password, email];
  const response = await db.query(query, values);
  console.log(response);
  return response && response.rowCount && response.rowCount > 0;
};

const isUserAlreadyPresent = async (name) => {
  const query = `Select name from consumer where name = $1`;
  const response = await db.query(query, [name]);
  return response && response.rowCount && response.rowCount > 0; // TODO: need to null check.
};

module.exports = {
  registerConsumer,
};
