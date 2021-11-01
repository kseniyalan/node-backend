const moment = require('moment');
const { RefreshToken } = require('../dao');
const JWThandler = require('./jwt');

// Method for obtaining a token and a refresh token for a session
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