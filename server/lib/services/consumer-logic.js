const consumerRepo = require('../data-access/consumer-repository');

const registerConsumer = async (username, password, email) => {
  const lowerCaseUsername = username.toLowerCase();
  const response = await consumerRepo.registerConsumer(lowerCaseUsername, username, password, email); 
  console.log(lowerCaseUsername + ' - ' + email + ' - ' + password);
  return response;
};

module.exports = {
  registerConsumer,
};
