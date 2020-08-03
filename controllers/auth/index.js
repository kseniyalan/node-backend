const moment = require('moment');
const { Op } = require('sequelize');

const DBModules = require('../../modules/db-modules');
const JWThandler = require('../../modules/jwt');
const Error = require('../../modules/request_error');

const { Session, RefreshToken } = require('../../dao');

const config = require('../../config');
const AuthModule = require('./modules');

exports.Ping = async (ctx) => {
  return (ctx.body = {
    ping: 'pong',
  });
};

exports.Auth = async (ctx) => {
  const { fruitExists, error, text } = await AuthModule.ValidateFruitAuth(
    ctx.request.body,
  );

  if (error) {
    return Error(ctx, 400, text);
  }

  if (!fruitExists) {
    return Error(ctx, 404, 'Фрукт не найден');
  }

  const { token, refreshToken } = await AuthModule.UpsertFruitSession({
    fruitExists: fruitExists.id,
  });

  return (ctx.body = {
    token: token,
    refresh_token: refreshToken,
  });
};

exports.LogOut = async (ctx) => {
  await Session.update(
    {
      last_update: moment().subtract(100, 'year'),
    },
    {
      where: {
        token: ctx.request.header.token,
        status: 'ENABLED',
        type: config.userRoleFruit,
      },
      limit: 1,
      returning: false,
    },
  );

  return (ctx.status = 200);
};

exports.RefreshToken = async (ctx) => {
  const oldRefreshToken = ctx.request.body.refresh_token;

  if (!Validators.nonEmptyString(oldRefreshToken)) {
    return Error(ctx, 400, 'Не удалось получить токен');
  }

  const tokenData = await JWThandler.verifyToken(oldRefreshToken);

  if (!tokenData) {
    return Error(ctx, 400, 'Не удалось получить токен');
  }

  const refreshExists = await RefreshToken.findOne({
    where: {
      token: oldRefreshToken,
      created_at: {
        [Op.gte]: moment().subtract(1, 'month'),
      },
    },
    include: [
      {
        model: Session,
        where: {
          status: 'ENABLED',
        },
        required: true,
      },
    ],
  });

  if (!refreshExists) {
    return Error(ctx, 401, 'Токен не найден');
  }

  const { token, refreshToken } = await DBModules.HandleSession({
    session: refreshExists.Session,
  });

  await RefreshToken.destroy({
    where: {
      token: oldRefreshToken,
    },
  });

  return (ctx.body = {
    id: refreshExists.Session.fruit_id,
    token: token,
    refresh_token: refreshToken,
  });
};
