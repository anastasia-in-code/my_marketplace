const { roleCheckGuard } = require('../roleCheckGuard');
const { ShopRepository } = require('../../shops/shop.repository');
const { checkRolePermissions } = require('../../../libs/checkRolePermissions');
const { ADD_ADMIN } = require('../../../../db/constants');

jest.mock('../../../libs/checkRolePermissions');

describe('Role Check Guard', () => {
  const ctx = {
    params: {
      shopId: '0375bae5-8a69-40ef-abaf-a9ce2c587e7c',
    },
    req: {
      user: {
        id: 18,
        first_name: 'test first name',
        last_name: 'test last name',
        email: '55@gmail.com',
        phone_number_id: 96,
      },
    },
  };

  const shop = {
    uuid: '0375bae5-8a69-40ef-abaf-a9ce2c587e7c',
    name: 'newshop',
    phone_number_id: 22,
    expirationDate: null,
  };

  const next = jest.fn();

  let findByUUIDSpy;

  beforeEach(() => {
    findByUUIDSpy = jest.spyOn(ShopRepository, 'findByUUID');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('action allowed when user has permissions', async () => {
    findByUUIDSpy.mockResolvedValue(shop);
    checkRolePermissions.mockResolvedValue([ADD_ADMIN]);

    const middleware = roleCheckGuard(ADD_ADMIN);
    await middleware(ctx, next);

    expect(ShopRepository.findByUUID).toHaveBeenCalledWith(shop.uuid);
    expect(checkRolePermissions).toHaveBeenCalledWith(ctx.req.user, shop);
    expect(next).toHaveBeenCalled();
  });

  it('action isn`t allowed when user has permissions', async () => {
    findByUUIDSpy.mockResolvedValue(shop);
    checkRolePermissions.mockResolvedValue([]);

    const middleware = roleCheckGuard(ADD_ADMIN);
    await middleware(ctx, next);

    expect(ShopRepository.findByUUID).toHaveBeenCalledWith(shop.uuid);
    expect(checkRolePermissions).toHaveBeenCalledWith(ctx.req.user, shop);
    expect(ctx.status).toBe(403);
    expect(ctx.body.error).toEqual('Forbidden');
    expect(ctx.body.message).toEqual('you are not allowed to perform this action');
    expect(next).toHaveBeenCalled();
  });
});
