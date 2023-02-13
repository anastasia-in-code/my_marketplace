const Router = require('koa-router');
const passport = require('koa-passport');

require('./passport');

const { REFRESH_JWT_AUTH_STRATEGY, BASIC_AUTH_STRATEGY } = require('../../../db/constants');
const { makeContoller } = require('../../libs/makeController');

const { updateTokens } = require('./controllers/updateTokens');
const { loginUser } = require('./controllers/loginUser');

const authRouter = new Router();

authRouter.use(passport.initialize());

authRouter.post(
  '/login',
  passport.authenticate(BASIC_AUTH_STRATEGY, { session: false }),
  makeContoller(loginUser),
);

authRouter.get(
  '/tokens',
  passport.authenticate(REFRESH_JWT_AUTH_STRATEGY, { session: false }),
  makeContoller(updateTokens),
);

module.exports = { authRouter };
