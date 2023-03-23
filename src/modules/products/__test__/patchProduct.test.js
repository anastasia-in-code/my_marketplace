const { patchProduct } = require('../controllers/patchProduct');
const { ProductRepository } = require('../product.repository');

describe('patch product', () => {
  let findByUUIDSpy;
  let updateSpy;

  const ctx = {
    request: {
      body: {
        newName: 'new name product',
        newPrice: '11.40',
        newDescription: 'test new description',
      },
    },
    params: { productId: '1234' },
  };

  const outdatedProduct = {
    name: 'old name product',
    price: '12.30',
    description: 'test old description',
    id: '1234',
  };

  const updatedProduct = {
    name: 'new name product',
    price: '11.40',
    description: 'test new description',
    id: '1234',
  };

  beforeEach(() => {
    findByUUIDSpy = jest.spyOn(ProductRepository, 'findByUUID');
    updateSpy = jest.spyOn(ProductRepository, 'update');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns deleted product', async () => {
    findByUUIDSpy.mockResolvedValue(outdatedProduct);
    updateSpy.mockResolvedValue(updatedProduct);

    const response = await patchProduct(ctx);

    expect(findByUUIDSpy).toHaveBeenCalledWith(ctx.params.productId);
    expect(updateSpy).toHaveBeenCalledWith(outdatedProduct, ctx.request.body);
    expect(response).toEqual(updatedProduct);
  });
});
