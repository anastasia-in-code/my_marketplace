const { ADMIN_PERMISSIONS, EDITOR_PERMISSIONS } = require('../../db/rolePermissions');
const { ShopRepository } = require('../modules/shops/shop.repository');

async function checkRolePermissions(user, shop, action) {
  const shopAdmins = await ShopRepository.getAdminsByUUID(shop.id);

  const isAdmin = shopAdmins.find((admin) => admin.id === user.id);

  if (isAdmin) {
    switch (isAdmin.user_role) {
      case 'admin':
        return ADMIN_PERMISSIONS.includes(action);
      case 'editor':
        return EDITOR_PERMISSIONS.includes(action);
      default:
        return false;
    }
  }

  return false;
}

module.exports = { checkRolePermissions };
