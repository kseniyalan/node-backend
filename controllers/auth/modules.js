const crypto = require('crypto');
const moment = require('moment');

const JWThandler = require('../../modules/jwt');
const Validators = require('../../modules/validators');

const { Manager, Session, RefreshToken } = require('../../dao');

const config = require('../../config');

exports.ValidateManagerAuth = async ({ login, password }) => {
  if (
    !Validators.nonEmptyString(login) ||
    login.length < 5 ||
    !Validators.nonEmptyString(password)
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