const Validators = require('../../modules/validators');

const Error = require('../../modules/request_error');

module.exports = async (ctx, next) => {
  const token = ctx.request.header.token;

  if (!Validators.nonEmptyString(token)) {
    return Error(ctx, 401, 'Не удалось получить токен');
  }

  if (token !== 'token') {
    return Error(ctx, 401, 'Неверный токен');
  }

  return next();
};
