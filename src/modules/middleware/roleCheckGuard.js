const Boom = require('boom');
const { authService } = require('../authorization/authService');
const { ShopRepository } = require('../shops/shop.repository');
const { checkRolePermissions } = require('../../libs/checkRolePermissions');

function forbidden(ctx) {
  const error = Boom.forbidden('you are not allowed to perform this action');
  const errorData = error.output.payload;
  ctx.status = errorData.statusCode;
  ctx.body = errorData;
  return null;
}

const roleCheckGuard = async (ctx, next, action) => {
  const token = ctx.request.header.authorization.split(' ')[1];
  const shopUUID = ctx.params.id;
  const user = await authService.getUserByToken(token);
  const admins = await ShopRepository.getAdminsByUUID(shopUUID);
  const isAdmin = admins.find((admin) => admin.id === user.id);

  if (!isAdmin) {
    return forbidden(ctx);
  }

  const hasPermission = checkRolePermissions(isAdmin.user_role, action);

  if (!hasPermission) {
    return forbidden(ctx);
  }

  await next();
};

module.exports = { roleCheckGuard };
