const { patchShop } = require('../controllers/patchShop');
const { ShopRepository } = require('../shop.repository');

describe('patchShop', () => {
  let findByUUIDSpy;
  let updateSpy;

  const ctx = {
    params: {
      shopId: '0375bae5-8a69-40ef-abaf-a9ce2c587e7c',
    },
    request: {
      body: {
        newName: 'newShopName',
        newPhoneNumber: '222222222',
      },
    },
  };

  const shop = {
    id: 'e26ccaa5-04d4-43d3-ba74-91d9d23be86d',
    name: 'newshop',
    phone_number_id: 11,
    expirationDate: null,
  };
  const updatedShop = {
    id: 'e26ccaa5-04d4-43d3-ba74-91d9d23be86d',
    name: 'newshop',
    phone_number_id: 12,
    expirationDate: null,
  };

  beforeEach(() => {
    findByUUIDSpy = jest.spyOn(ShopRepository, 'findByUUID');
    updateSpy = jest.spyOn(ShopRepository, 'update');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('patchShop should return updated shop', async () => {
    findByUUIDSpy.mockResolvedValue(shop);
    updateSpy.mockResolvedValue(updatedShop);

    const response = await patchShop(ctx);

    expect(findByUUIDSpy).toHaveBeenCalledWith(ctx.params.shopId);
    expect(updateSpy).toHaveBeenCalledWith(shop, ctx.request.body);
    expect(response).toEqual({
      id: 'e26ccaa5-04d4-43d3-ba74-91d9d23be86d',
      name: 'newshop',
      phone_number_id: 12,
      expirationDate: null,
    });
  });
});
