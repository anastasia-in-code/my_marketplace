const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { hashVerify } = require('../../libs/hashPassword');
const { UserRepository } = require('../users/user.repository');
const { refreshJWT, accessJWT, basic } = require('../../../db/constants');

const config = require('../../../config');

passport.use(basic, new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (async (username, password, done) => {
  const userFound = await UserRepository.findByEmail(username);

  if (userFound) {
    const checkPassword = await hashVerify(userFound[0].password, password);

    if (checkPassword) {
      return done(null, userFound[0]);
    }
  }
  return done(null, false);
})));

const optsAccess = {};
optsAccess.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
optsAccess.secretOrKey = config.accessTokenSecretKey;

passport.use(accessJWT, new JwtStrategy(optsAccess, async (jwtPayload, done) => {
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

passport.use(refreshJWT, new JwtStrategy(optsRefresh, async (jwtPayload, done) => {
  try {
    const user = await UserRepository.findById(jwtPayload.id);
<<<<<<< HEAD
    if (user) {
      return done(null, user);
    }
    return done(null, false);
=======

    return done(null, user || false);
>>>>>>> 55b8bb6... shopping card service
  } catch (error) {
    console.log(error);
    return null;
  }
}));
