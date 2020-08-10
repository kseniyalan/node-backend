const crypto = require('crypto');
const moment = require('moment');

const JWThandler = require('../../modules/jwt');
const Validators = require('../../modules/validators');

const { Manager, Session, RefreshToken } = require('../../dao');

const config = require('../../config');

//Валидация авторизации пользователя
exports.ValidateManagerAuth = async ({ login, password }) => {
  if (
    !Validators.nonEmptyString(login) 
    || login.length < 5
    || !Validators.nonEmptyString(password)
  ) {
    return {
      error: true,
      text: 'Не удалось получить параметры запроса',
      managerExists: null,
    };
  }

  const managerExists = await Manager.findOne({
    where: {
      login: login.toLowerCase(),
      password: crypto
        .createHmac('sha512', config.passwordSalt)
        .update(password)
        .digest('hex'),
    },
  });

  return { managerExists, error: false };
};

//Валидация создания пользователя (регистрации)
exports.ValidateManagerCreation = async ({ login, password }) => {
  //Проверка валидности логина и пароля
  if (
    !Validators.nonEmptyString(login) 
    || login.length < 5
    || !Validators.nonEmptyString(password)
    || password.length < 5
  ) {
    return {
      error: true,
      errorText: 'Не удалось получить параметры запроса',
    };
  }

  //Проверка, не занят ли уже этот логин
  const managerExists = await Manager.count({ //Вернет количество найденных объетов, а не сам объект, что более оптимально
    where: {
      login: login.toLowerCase(),
    },
  });

  if (managerExists) return {
    error: true,
    errorText: 'Данный логин уже используется',
  }; 

  return { login, password, error: false };
};

exports.CreateManager = async ({ login, password }) => {
    let manager = await Manager.create(
      {
        login: login.toLowerCase(),
        password: crypto
          .createHmac('sha512', config.passwordSalt)
          .update(password)
          .digest('hex'),
      },
    );

  if (!manager) return {
    managerId: null,
    creationError: true,
    creationErrorText: 'Ошибка при создании пользователя',
  };

  return { managerId: manager.id, creationError: false };
};

exports.UpsertManagerSession = async ({ managerId }) => {
  let session = await Session.findOne({
    where: { manager_id: managerId, type: config.userRoleManager },
  });

  if (!session) {
    session = await Session.create({
      token: await JWThandler.generateToken({
        token_type: 'general',
        valid_through: moment().add(1, 'week').toDate(),
      }),
      manager_id: managerId,
      type: config.userRoleManager,
      status: 'ENABLED',
    });
  }

  const refreshToken = await JWThandler.generateToken({ 
    token_type: 'refresh',
    valid_through: moment().add(1, 'month').toDate(),
  });

  await RefreshToken.create({
    session_id: session.id,
    token: refreshToken,
  });

  return {
    token: session.token,
    refreshToken,
  };
};

exports.CreateManagerSession = async ({ managerId }) => {
  let session = await Session.create({
    token: await JWThandler.generateToken({
      token_type: 'general',
      valid_through: moment().add(1, 'week').toDate(),
    }),
    manager_id: managerId,
    type: config.userRoleManager,
    status: 'ENABLED',
  });

  const refreshToken = await JWThandler.generateToken({ 
    token_type: 'refresh',
    valid_through: moment().add(1, 'month').toDate(),
  });

  await RefreshToken.create({
    session_id: session.id,
    token: refreshToken,
  });

  return {
    token: session.token,
    refreshToken,
  };
};