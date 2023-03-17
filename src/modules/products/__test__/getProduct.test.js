const { getProduct } = require('../controllers/getProduct');
const { ProductRepository } = require('../product.repository');

describe('get product', () => {
  let findByUUIDSpy;

  const ctx = {
    params: {
      productId: 123,
    },
  };

  const product = {
    is_active: true,
    id: '123',
    name: 'product',
    price: 3322,
    description: 'test description',
    shop_id: '123',
    file_id: '123',
  };
  beforeEach(() => {
    findByUUIDSpy = jest.spyOn(ProductRepository, 'findByUUID');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns product data', async () => {
    findByUUIDSpy.mockResolvedValue(product);

    const response = await getProduct(ctx);

    expect(findByUUIDSpy).toHaveBeenCalledWith(ctx.params.productId);
    expect(response).toEqual(product);
  });
});
