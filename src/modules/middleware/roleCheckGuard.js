const Boom = require('boom');
const { ShopRepository } = require('../shops/shop.repository');
const { checkRolePermissions } = require('../../libs/checkRolePermissions');

function forbidden(ctx) {
  const error = Boom.forbidden('you are not allowed to perform this action');
  const errorData = error.output.payload;
  ctx.status = errorData.statusCode;
  ctx.body = errorData;
  return null;
}

function roleCheckGuard(action) {
  return async (ctx, next) => {
    const { shopId: shopUUID } = ctx.params;
    const { user } = ctx.req;

    const shop = await ShopRepository.findByUUID(shopUUID);

    const userPermissions = await checkRolePermissions(user, shop);
    if (!userPermissions || !userPermissions.includes(action)) {
      return forbidden(ctx);
    }

    return next();
  };
}

module.exports = { roleCheckGuard };
