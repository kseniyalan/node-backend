// Подключаем модуль Redis
const redis  = require('redis');
// Создаем клиента
const client = redis.createClient();

module.exports = client;