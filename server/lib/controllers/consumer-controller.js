const consumerLogic = require('../services/consumer-logic');

const registerConsumer = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password, email } = req.body;
    const response = await consumerLogic.registerConsumer(username, password, email);
    if(response) {
      res.status(200).send('User Successfully Registered.');
    } else {
      res.status(500).send('Some Problem Occured.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Some Problem Occured.');
  }
};

const printKey = async (req, res) => {
  res.send(req.params);
};

module.exports = {
  registerConsumer,
  printKey,
};
