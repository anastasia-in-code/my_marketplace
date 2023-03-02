const { checkRolePermissions } = require('../checkRolePermissions');
const { ADD_ADMIN, EDIT_SHOP } = require('../../../db/constants');

const { ShopRepository } = require('../../modules/shops/shop.repository');

describe('Chek Role Permissions', () => {
  let getAdminsByUUIDSpy;

  const shop = {
    id: '0375bae5-8a69-40ef-abaf-a9ce2c587e7c',
    name: 'newshop',
    phone_number_id: 22,
    expirationDate: null,
  };

  const admins = [{
    id: 12,
    first_name: 'test first name',
    last_name: 'test last name',
    email: 'user2@gmail.com',
    phone_number_id: 45,
    user_role: 'admin',
  }];

  const editors = [{
    uuid: 12,
    first_name: 'test first name',
    last_name: 'test last name',
    email: 'user2@gmail.com',
    phone_number_id: 45,
    password: '$argon2id$v=19$m=65536,t=3,p=4$WRSNuSOP9GiyEHdt0NqhZg$vhVSNeG8Cx2r0ee4V+B+D0X5Mdg0Op4jZU185bjEbmQ',
    user_role: 'editor',
  }];

  beforeEach(() => {
    getAdminsByUUIDSpy = jest.spyOn(ShopRepository, 'getAdminsByUUID');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('admin has ADD_ADMIN permissions', async () => {
    getAdminsByUUIDSpy.mockResolvedValue(admins);

    const result = await checkRolePermissions(admins[0], shop);

    expect(getAdminsByUUIDSpy).toHaveBeenCalledWith(shop.id);
    expect(result).toContain(ADD_ADMIN);
  });

  it('editor doesn`t have ADD_ADMIN permissions', async () => {
    getAdminsByUUIDSpy.mockResolvedValue(editors);

    const result = await checkRolePermissions(editors[0], shop, ADD_ADMIN);

    expect(getAdminsByUUIDSpy).toHaveBeenCalledWith(shop.id);
    expect(result).not.toContain(ADD_ADMIN);
  });

  it('admin has EDIT_SHOP permissions', async () => {
    getAdminsByUUIDSpy.mockResolvedValue(admins);

    const result = await checkRolePermissions(admins[0], shop, EDIT_SHOP);

    expect(getAdminsByUUIDSpy).toHaveBeenCalledWith(shop.id);
    expect(result).toContain(EDIT_SHOP);
  })

  it('editor doesn`t have EDIT_SHOP permissions', async () => {
    getAdminsByUUIDSpy.mockResolvedValue(editors);

    const result = await checkRolePermissions(editors[0], shop, EDIT_SHOP);

    expect(getAdminsByUUIDSpy).toHaveBeenCalledWith(shop.id);
    expect(result).not.toContain(EDIT_SHOP);
  });

});
