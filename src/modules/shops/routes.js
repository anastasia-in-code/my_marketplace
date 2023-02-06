// new koa router exported to index
const Router = require('koa-router');
const passport = require('koa-passport');

require('../authorization/passport');
const { makeContoller } = require('../../libs/makeController');
const { createShop } = require('./controllers/createShop');
const { getShop } = require('./controllers/getShop');
const { addAdminOrEditor } = require('./controllers/addAdminOrEditor');
const { patchShop } = require('./controllers/patchShop');

const shopRouter = new Router();
const { roleCheckGuard } = require('../middleware/roleCheckGuard');

shopRouter.post('/post', makeContoller(createShop));
shopRouter.get('/:id', makeContoller(getShop));

shopRouter.post(
  '/:id/admin',
  passport.authenticate('accessJWT', { session: false }),
  ((ctx, next) => roleCheckGuard(ctx, next, 'ADD_ADMIN')),
  makeContoller(addAdminOrEditor),
);

shopRouter.patch(
  '/:id/edit',
  passport.authenticate('accessJWT', { session: false }),
  ((ctx, next) => roleCheckGuard(ctx, next, 'EDIT_SHOP')),
  makeContoller(patchShop),
);

module.exports = { shopRouter };
