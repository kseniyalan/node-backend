const crypto = require('crypto');
const moment = require('moment');

const JWThandler = require('../../modules/jwt');
const Validators = require('../../modules/validators');

const { Fruit, Session, RefreshToken } = require('../../dao');

const config = require('../../config');

exports.ValidateFruitAuth = async ({ login, password }) => {
  if (
    !Validators.nonEmptyString(login) ||
    login.length < 5 ||
    !Validators.nonEmptyString(password)
  ) {
    return {
      error: true,
      text: 'Не удалось получить параметры запроса', 
      fruitExists: null,
    };
  }

  const fruitExists = await Fruit.findOne({
    where: {
      login: login.toLowerCase(),
      password: crypto
        .createHmac('sha512', config.passwordSalt)
        .update(password)
        .digest('hex'),
    },
  });

  return { fruitExists, error: false };
};

exports.UpsertFruitSession = async ({ fruitId }) => {
  let session = await Session.findOne({
    where: { fruit_id: fruitId, type: config.userRoleFruit },
  });

  if (!session) {
    session = await Session.create({
      token: await JWThandler.generateToken({
        token_type: 'general',
        valid_through: moment().add(1, 'week').toDate(),
      }),
      fruit_id: fruitId,
      type: config.userRoleFruit,
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
