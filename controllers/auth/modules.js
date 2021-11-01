const crypto = require('crypto');
const moment = require('moment');
const redis = require('redis');

const JWThandler = require('../../modules/jwt');
const Validators = require('../../modules/validators');

const { Manager, Session, RefreshToken } = require('../../dao');
const redisClient = require('../../redis');

const config = require('../../config');

//User authorization validation
exports.ValidateManagerAuth = async ({ login, password }) => {
  if (
    !Validators.nonEmptyString(login) 
    || login.length < 5
    || !Validators.nonEmptyString(password)
  ) {
    return {
      error: true,
      text: 'Failed to get request parameters',
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

//User creation (registration) validation
exports.ValidateManagerCreation = async ({ login, password }) => {
  //Checking the validity of the login and password
  if (
    !Validators.nonEmptyString(login) 
    || login.length < 5
    || !Validators.nonEmptyString(password)
    || password.length < 5
  ) {
    return {
      error: true,
      errorText: 'Failed to get request parameters',
    };
  }

  //Check if this login is already busy
  const managerExists = await Manager.count({ //Returns the number of found objects, not the object itself, which is more optimal
    where: {
      login: login.toLowerCase(),
    },
  });

  if (managerExists) return {
    error: true,
    errorText: 'This login is already in use',
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
    creationErrorText: 'Error during creating user',
  };

  return { managerId: manager.id, creationError: false };
};

exports.UpsertManagerSession = async ({ managerId }) => {
  let session = await Session.findOne({
    where: { manager_id: managerId, type: config.userRoleManager },
  });

  //Token generation
  const token = await JWThandler.generateToken({
    token_type: 'general',
    valid_through: moment().add(1, 'week').toDate(),
  });

  if (!session) {
    session = await Session.create({
      token,
      manager_id: managerId,
      type: config.userRoleManager,
      status: 'ENABLED',
    });
  }

  //Writing tokens in Redis
  redisClient.select(0, ( ) => {
    redisClient.on("error", (err) =>  {
        console.log("Error " + err);
    });
    // Data recording
    redisClient.set("token", token, redis.print);
    // Get data
    redisClient.get("token", (err, data) => {
        if(err) console.log(err);
        console.log('Redis data: ', data);
    });
    redisClient.quit( );
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