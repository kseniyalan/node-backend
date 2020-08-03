const moment = require('moment');
const Error = require('../../modules/request_error');
const AuthModule = require('./modules');

const config = require('../../config');

const { Session } = require('../../dao');

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

exports.GetFruitProfile = async (ctx) => {
  return (ctx.body = ctx.user);
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
