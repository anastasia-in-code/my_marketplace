// new koa router exported to index
const Router = require('koa-router');
const { makeContoller } = require('../../libs/makeController');
const { createShop } = require('./controllers/createShop');
const { getShop } = require('./controllers/getShop');
const { addAdminOrEditor } = require('./controllers/addAdminOrEditor');

const shopRouter = new Router();
const { roleCheckGuard } = require('../middleware/roleCheckGuard');

shopRouter.post('/post', makeContoller(createShop));
shopRouter.get('/:id', makeContoller(getShop));

shopRouter.post(
  '/:id/admin',
  ((ctx, next) => roleCheckGuard(ctx, next, 'ADD_ADMIN')),
  makeContoller(addAdminOrEditor),
);

module.exports = { shopRouter };
