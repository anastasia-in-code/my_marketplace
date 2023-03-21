// new koa router exported to index
const Router = require('koa-router');

const { makeContoller } = require('../../libs/makeController');

const cartRouter = new Router();

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
