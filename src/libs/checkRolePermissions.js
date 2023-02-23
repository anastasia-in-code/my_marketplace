const { ADMIN_PERMISSIONS, EDITOR_PERMISSIONS } = require('../../db/rolePermissions');
const { ShopRepository } = require('../modules/shops/shop.repository');

async function checkRolePermissions(user, shop) {
  const shopAdmins = await ShopRepository.getAdminsByUUID(shop.id);

  const isAdminOrEditor = shopAdmins.find((admin) => admin.id === user.id);

  if (!isAdminOrEditor) return false;

  switch (isAdminOrEditor.user_role) {
    case 'admin':
      return ADMIN_PERMISSIONS;
    case 'editor':
      return EDITOR_PERMISSIONS;
    default:
      return false;
  }
}

module.exports = { checkRolePermissions };
