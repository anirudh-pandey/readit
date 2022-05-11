const subredditRepo = require('../data-access/subreddit-repository');
// const { customAlphabet, urlAlphabet } = require('nanoid');

const getSubreddit = async (name, description) => {
  const lowerCaseName = name.toLowerCase();
  console.log(lowerCaseName);
  const response = await subredditRepo.getSubreddit(lowerCaseName);
  return response;
};

const createSubreddit = async (name, description) => {
  const lowerCaseName = name.toLowerCase();
  console.log(lowerCaseName);
  const response = await subredditRepo.createSubreddit(
    lowerCaseName,
    name,
    description
  );
  return response;
};

const updateSubreddit = async (subredditId, description) => {
  const response = await subredditRepo.updateSubreddit(
    subredditId,
    description
  );
  return response;
};

const deleteSubreddit = async (subredditId) => {
  const response = await subredditRepo.deleteSubreddit(subredditId);
  return response;
};

module.exports = {
  getSubreddit,
  createSubreddit,
  updateSubreddit,
  deleteSubreddit,
};
