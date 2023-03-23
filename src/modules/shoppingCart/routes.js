// new koa router exported to index
const Router = require('koa-router');
const passport = require('koa-passport');
require('../authorization/passport');
const { ACCESS_JWT_AUTH_STRATEGY } = require('../../../db/constants');

const { makeContoller } = require('../../libs/makeController');

const cartRouter = new Router();

cartRouter.use(passport.initialize());

const { addProduct } = require('./controllers/addProduct');
const { getCart } = require('./controllers/getCart');
const { deleteProduct } = require('./controllers/deleteProduct');
const { deleteOne } = require('./controllers/deleteOne');

cartRouter.post(
  '/:productId',
  makeContoller(addProduct),
);

cartRouter.patch(
  '/:productId',
  makeContoller(deleteOne),
);

cartRouter.get(
  '/',
  makeContoller(getCart),
);

cartRouter.delete(
  '/:productId',
  makeContoller(deleteProduct),
);

module.exports = { cartRouter };
