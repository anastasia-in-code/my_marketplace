const { postProduct } = require('../controllers/postProduct');
const { ProductRepository } = require('../product.repository');

describe('post product', () => {
  let createSpy;

  const ctx = {
    request: {
      body: {
        name: 'picture testfailed',
        price: '33.22',
        description: 'test description form data',
      },
    },
    params: {
      shopId: 213,
    },
  };

  const product = {
    id: '9645ac87-b16b-4ef4-aedf-9273c8c0d4e9',
    name: 'picture test',
    price: '11.11',
    description: 'test description',
    is_active: true,
    shop_id: '213',
  };
  beforeEach(() => {
    createSpy = jest.spyOn(ProductRepository, 'create');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns new product', async () => {
    createSpy.mockResolvedValue(product);

    const response = await postProduct(ctx);

    expect(createSpy).toHaveBeenCalledWith(ctx.request.body, ctx.params.shopId);
    expect(response).toEqual(product);
  });
});
