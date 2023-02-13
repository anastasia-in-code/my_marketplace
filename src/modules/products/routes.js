const Router = require('koa-router');
const passport = require('koa-passport');

require('../authorization/passport');
const { makeContoller } = require('../../libs/makeController');

const { ACCESS_JWT_AUTH_STRATEGY } = require('../../../db/constants');

const { ADD_PRODUCT, DELETE_PRODUCT } = require('../../../db/constants');

const productRouter = new Router();
const { roleCheckGuard } = require('../middleware/roleCheckGuard');

const { postProduct } = require('./controllers/postProduct');
const { getProduct } = require('./controllers/getProduct');
const { patchProduct } = require('./controllers/patchProduct');
const { deleteProduct } = require('./controllers/deleteProduct');
const { getAllShopProducts } = require('./controllers/getAllShopProducts');

productRouter.use(passport.initialize());

productRouter.post(
  '/post',
  passport.authenticate(ACCESS_JWT_AUTH_STRATEGY, { session: false }),
  roleCheckGuard(ADD_PRODUCT),
  makeContoller(postProduct),
);

productRouter.get(
  '/:productId',
  passport.authenticate(ACCESS_JWT_AUTH_STRATEGY, { session: false }),
  makeContoller(getProduct),
);

productRouter.patch(
  '/:productId',
  passport.authenticate(ACCESS_JWT_AUTH_STRATEGY, { session: false }),
  roleCheckGuard(ADD_PRODUCT),
  makeContoller(patchProduct),
);

productRouter.delete(
  '/:productId',
  passport.authenticate(ACCESS_JWT_AUTH_STRATEGY, { session: false }),
  roleCheckGuard(DELETE_PRODUCT),
  makeContoller(deleteProduct),
);

productRouter.get(
  '/',
  makeContoller(getAllShopProducts),
);

module.exports = { productRouter };
