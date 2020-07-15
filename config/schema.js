module.exports = {
  jwtSalt: {
    doc: 'Ключ, которым подписываются и валидируются JWT',
    format: String,
    default: null, // если не будет указан явно, то валидация не будет пройдена
    env: 'JWT_SECRET',
  },
  passwordSalt: {
    doc: 'Секрет подписи паролей',
    format: String,
    default: null,
    env: 'PASSWORD_SALT',
  },
  db: {
    PG_USERNAME: {
      doc: 'Имя пользователя',
      format: String,
      default: 'postgres',
      env: 'PG_USERNAME',
    },
    PG_PASSWORD: {
      doc: 'Пароль',
      format: String,
      default: null,
      env: 'PG_PASSWORD',
    },
    PG_DATABASE: {
      doc: 'Имя ДБ',
      format: String,
      default: null,
      env: 'PG_DATABASE',
    },
    PG_HOST: {
      doc: 'Хост',
      format: String,
      default: 'localhost',
      env: 'PG_HOST',
    },
    PG_PORT: {
      doc: 'Порт',
      format: 'port',
      default: 5432,
      env: 'PG_PORT',
    },
    PG_DIALECT: {
      doc: 'Диалект БД',
      format: String,
      default: 'postgres',
      env: 'PG_DIALECT',
    },
    operatorsAliases: {
      format: Boolean,
      default: false,
      env: 'PG_OPERATOR_ALIASES',
    },
    SSL: {
      doc: 'Поключение к БД по SSL',
      format: Boolean,
      default: false,
      env: 'PG_SSL_ENABLED',
    },
    dialectOptions: {
      ssl: {
        format: Boolean,
        default: false,
        env: 'PG_DIALECT_SSL_ENABLED',
      },
    },
    logging: {
      format: Boolean,
      default: true,
      env: 'PG_LOGGING_ENABLED',
    },
  },
  httpPort: {
    doc: 'http порт приложения',
    format: 'port',
    default: 80,
    env: 'HTTP_PORT',
  },
  staticDirectory: {
    doc: 'Директория со статикой приложения',
    format: String,
    default: 'static',
    env: 'STATIC_DIRECTORY',
  },
  apiVersion: {
    doc: 'Версия API',
    format: 'int',
    default: 1,
    env: 'API_VERSION',
  }
};
