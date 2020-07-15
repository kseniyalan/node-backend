const convict = require('convict');

const constants = require('./constants');

const configSchema = require('./schema');

const config = convict(configSchema);

// Если не будет указана валидная конфигурация, соответствующая схеме,
// то метод validate выбросит исключение и приложение не будет запущено
config.validate();

module.exports = Object.assign(constants, config.getProperties());
