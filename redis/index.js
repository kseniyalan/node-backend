// Connecting the Redis module
const redis  = require('redis');
// Create a client
const client = redis.createClient();

module.exports = client;