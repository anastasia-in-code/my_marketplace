const { ADMIN_PERMISSIONS, EDITOR_PERMISSIONS } = require('../../db/rolePermissions');

function checkRolePermissions(role, action) {
  let currentUserPermissions = [];
  // eslint-disable-next-line default-case
  switch (role) {
    case 'admin':
      currentUserPermissions = ADMIN_PERMISSIONS;
      break;
    case 'editor':
      currentUserPermissions = EDITOR_PERMISSIONS;
      break;
  }
  return currentUserPermissions.includes(action);
}

module.exports = { checkRolePermissions };
