const jwt = require('jsonwebtoken');
const util = require('util');
const config = require('../config');

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

exports.generateToken = async (data) => {
  return await sign(data, config.jwtSalt);
};

exports.verifyToken = async (token) => {
  try {
    return await verify(token, config.jwtSalt);
  } catch (err) {
    return null;
  }
};
