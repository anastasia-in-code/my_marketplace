const Router = require('koa-router');

const router = new Router();

const { userRouter } = require('./modules/users/index');
const { shopRouter } = require('./modules/shops/index');
const { authRouter } = require('./modules/authorization/routes');
const { cartRouter } = require('./modules/shoppingCart/routes');

router.use('/users', userRouter.routes());
router.use('/shops', shopRouter.routes());
router.use('/auth', authRouter.routes());
router.use('/cart', cartRouter.routes());

router.get('/healthcheck', async (ctx) => {
  const healthcheck = {
    uptime: process.uptime(),
    processtime: process.hrtime(),
    message: 'OK',
    timestamp: new Date(),
  };
  ctx.body = healthcheck;
});

module.exports = { router };
