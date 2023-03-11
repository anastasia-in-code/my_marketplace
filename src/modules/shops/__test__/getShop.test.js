const { getShop } = require('../controllers/getShop');

const { ShopRepository } = require('../shop.repository');

describe('get shop', () => {
  let findByUUIDSpy;

  const ctx = {
    params: {
      shopId: '1234',
    },
  };

  const shop = {
    id: '50849706-c5b9-4684-acd6-1c3e2119b9e4',
    name: 'test shop',
    phone_number_id: 9,
    expirationDate: null,
  };

  beforeEach(() => {
    findByUUIDSpy = jest.spyOn(ShopRepository, 'findByUUID');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('getShop returns shop data', async () => {
    findByUUIDSpy.mockResolvedValue(shop);

    const response = await getShop(ctx);

    expect(findByUUIDSpy).toHaveBeenCalledWith(ctx.params.shopId);
    expect(response).toEqual(shop);
  });
});
