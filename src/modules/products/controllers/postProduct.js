const { ProductRepository } = require('../product.repository');

const postProduct = async (ctx) => {
  const { id: shopId } = ctx.params;
  const { body: newProductData } = ctx.request;

  const newProduct = await ProductRepository.create(newProductData, shopId);

  return newProduct;
};

module.exports = { postProduct };
