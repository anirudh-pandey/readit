const redis = require('redis');
const { promisifyAll } = require('bluebird');
const REDIS_PORT = 6379;

promisifyAll(redis);
const client = redis.createClient(REDIS_PORT);

client.on('error', (error) => {
  console.error(error);
});

const getFromCache = async (key, dbCallback) => {
  try {
    if (key !== null && key !== undefined && key !== '') {
      if(await client.existsAsync(key)) {
        console.log("-------Data present-------");
        const storedData = await client.getAsync(key);
        const parsedData = JSON.parse(storedData);
        return parsedData;
      } else {
        console.log("-------Data not present-------");
        const data = await dbCallback();
        const stringifiedData = JSON.stringify(data);
        await client.setAsync(key, stringifiedData);
        return data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFromCache
};

//---------------REDIS CLI------------------
// open Ubuntu
// type "redis-server" (now your redis-server is running).
// open new ubuntu window
// type "redis-cli"

// sudo service redis-server start
// sudo service redis-server stop
// sudo service redis-server restart
//------------------------------------------
// make a connection to the local instance of redis