const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { hashVerify } = require('../../libs/hashPassword');
const { UserRepository } = require('../users/user.repository');
const { REFRESH_JWT_AUTH_STRATEGY, ACCESS_JWT_AUTH_STRATEGY, BASIC_AUTH_STRATEGY } = require('../../../db/constants');

const config = require('../../../config');

passport.use(BASIC_AUTH_STRATEGY, new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (async (username, password, done) => {
  const userFound = await UserRepository.findByEmail(username);

  if (userFound) {
    const checkPassword = await hashVerify(userFound.password, password);

    if (checkPassword) {
      return done(null, userFound);
    }
  }
  return done(null, false);
})));

const optsAccess = {};
optsAccess.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
optsAccess.secretOrKey = config.accessTokenSecretKey;

passport.use(ACCESS_JWT_AUTH_STRATEGY, new JwtStrategy(optsAccess, async (jwtPayload, done) => {
  try {
    const user = await UserRepository.findById(jwtPayload.id);

    return done(null, user || false);
  } catch (error) {
    console.log(error);
    return null;
  }
}));

const optsRefresh = {};
optsRefresh.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
optsRefresh.secretOrKey = config.refreshTokenSecretKey;

passport.use(REFRESH_JWT_AUTH_STRATEGY, new JwtStrategy(optsRefresh, async (jwtPayload, done) => {
  try {
    const user = await UserRepository.findById(jwtPayload.id);

    return done(null, user || false);
  } catch (error) {
    console.log(error);
    return null;
  }
}));
