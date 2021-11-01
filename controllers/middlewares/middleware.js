const moment = require('moment');
const { Session, Manager } = require('../../dao');
const Validators = require('../../modules/validators');

const Error = require('../../modules/request_error');
const config = require('../../config');

module.exports = async (ctx, next) => {
  const token = ctx.request.header.token;

  if (!Validators.nonEmptyString(token)) {
    return Error(ctx, 401, 'Failed to get token');
  }

  const session = await Session.findOne({
    where: {
      token: token,
      status: 'ENABLED',
      type: config.userRoleManager,
    },
    include: [
      {
        model: Manager,
        required: true,
      },
    ],
  });

  if (!session) {
    return Error(ctx, 401, 'Session is not found');
  }

  if (moment(session.last_update).isBefore(moment().subtract(1, 'week'))) {
    return Error(ctx, 401, 'Token expired');
  }

  return next();
};
