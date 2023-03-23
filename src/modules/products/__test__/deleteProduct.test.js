const { deleteProduct } = require('../controllers/deleteProduct');
const { ProductRepository } = require('../product.repository');

describe('delete product', () => {
  let findByUUIDSpy;
  let deleteSpy;

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

  const deletedProduct = {
    is_active: false,
    id: '123',
    name: 'product',
    price: 3322,
    description: 'test description',
    shop_id: '123',
    file_id: '123',
  };

  const notFound = {
    result: 'product doesn`t exist',
  };

  beforeEach(() => {
    findByUUIDSpy = jest.spyOn(ProductRepository, 'findByUUID');
    deleteSpy = jest.spyOn(ProductRepository, 'delete');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns deleted product', async () => {
    findByUUIDSpy.mockResolvedValue(product);
    deleteSpy.mockResolvedValue(deletedProduct);

    const response = await deleteProduct(ctx);

    expect(findByUUIDSpy).toHaveBeenCalledWith(ctx.params.productId);
    expect(deleteSpy).toHaveBeenCalledWith(ctx.params.productId);
    expect(response).toEqual(deletedProduct);
  });

  it('returns "product doesnt exist"', async () => {
    findByUUIDSpy.mockResolvedValue(undefined);

    const response = await deleteProduct(ctx);

    expect(findByUUIDSpy).toHaveBeenCalledWith(ctx.params.productId);
    expect(deleteSpy).not.toHaveBeenCalled();
    expect(response).toEqual(notFound);
  });
});
