/* eslint-disable no-undef */
const { checkRolePermissions } = require('../checkRolePermissions');

describe('Chek Role Permissions', () => {
  it('admin has permissions to assign new admin', () => {
    const result = checkRolePermissions('admin', 'ADD_ADMIN');
    expect(result).toBeTruthy();
  });

  it('editor has no permissions to assign new admin', () => {
    const result = checkRolePermissions('editor', 'ADD_ADMIN');
    expect(result).toBeFalsy();
  });
});
