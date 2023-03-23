const { ProductRepository } = require('../product.repository');

const postProduct = async (ctx) => {
  const { shopId } = ctx.params;
  const { body: newProductData } = ctx.request;
  newProductData.file = ctx.request.file;

  const newProduct = await ProductRepository.create(newProductData, shopId);

  return newProduct;
};

module.exports = { postProduct };
