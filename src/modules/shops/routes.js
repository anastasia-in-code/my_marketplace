// new koa router exported to index
const Router = require('koa-router');
const passport = require('koa-passport');

require('../authorization/passport');
const { makeContoller } = require('../../libs/makeController');

const { productRouter } = require('../products/routes');

const { createShop } = require('./controllers/createShop');
const { getShop } = require('./controllers/getShop');
const { addAdminOrEditor } = require('./controllers/addAdminOrEditor');
const { patchShop } = require('./controllers/patchShop');

const { ACCESS_JWT_AUTH_STRATEGY } = require('../../../db/constants');

const shopRouter = new Router();
const { roleCheckGuard } = require('../middleware/roleCheckGuard');
const { GET_SHOP, EDIT_SHOP, ADD_ADMIN } = require('../../../db/constants');

shopRouter.use(passport.initialize());
shopRouter.use('/:shopId/products', productRouter.routes());

shopRouter.post('/post', makeContoller(createShop));
shopRouter.get(
  '/:shopId',
  passport.authenticate(ACCESS_JWT_AUTH_STRATEGY, { session: false }),
  roleCheckGuard(GET_SHOP),
  makeContoller(getShop),
);

shopRouter.post(
  '/:shopId/admin',
  passport.authenticate(ACCESS_JWT_AUTH_STRATEGY, { session: false }),
  roleCheckGuard(ADD_ADMIN),
  makeContoller(addAdminOrEditor),
);

shopRouter.patch(
  '/:shopId/edit',
  passport.authenticate(ACCESS_JWT_AUTH_STRATEGY, { session: false }),
  roleCheckGuard(EDIT_SHOP),
  makeContoller(patchShop),
);

module.exports = { shopRouter };
