const moment = require('moment');
const { RefreshToken } = require('../dao');
const JWThandler = require('./jwt');

// Метод получения токена и рефреш-токена для сессии
exports.HandleSession = async ({ session }) => {
  if (moment(session.last_update).isBefore(moment().subtract(1, 'week'))) {
    (session.token = await JWThandler.generateToken({
      token_type: 'general',
      valid_through: moment().add(1, 'week').toDate(),
    })),
      (session.last_update = new Date());

    await session.save();
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