const { getAllShopProducts } = require('../controllers/getAllShopProducts');
const { ProductRepository } = require('../product.repository');

describe('get all products in shop', () => {
  let getAllByShopSpy;

  const ctx = {
    query: { page: '1', limit: '20' },
    params: {
      shopId: 123,
    },
  };

  const result = {
    results: [
      {
        id: '456',
        name: 'product1',
        price: 11.11,
        description: 'test description',
        shop_id: '123',
        is_active: true,
        file_id: null,
      },
    ],
    total: 1,
  };

  const emptyResult = {
    results: [],
    total: 0,
  };

  beforeEach(() => {
    getAllByShopSpy = jest.spyOn(ProductRepository, 'getAllByShop');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns shop products', async () => {
    getAllByShopSpy.mockResolvedValue(result);

    const response = await getAllShopProducts(ctx);

    expect(getAllByShopSpy).toHaveBeenCalledWith(ctx.params.shopId, ctx.query.page, ctx.query.limit);
    expect(response).toEqual(result);
  });

  it('returns empty list', async () => {
    getAllByShopSpy.mockResolvedValue(emptyResult);

    const response = await getAllShopProducts(ctx);

    expect(getAllByShopSpy).toHaveBeenCalledWith(ctx.params.shopId, ctx.query.page, ctx.query.limit);
    expect(response).toEqual(emptyResult);
  });
});
