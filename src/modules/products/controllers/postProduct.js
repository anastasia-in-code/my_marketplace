const { ProductRepository } = require('../product.repository');

const postProduct = async (ctx) => {
  const { shopId } = ctx.params;
  const { body: newProductData } = ctx.request;
  if (ctx.request.file) {
    newProductData.file = ctx.request.file;
  }

  const newProduct = await ProductRepository.create(newProductData, shopId);

  return newProduct;
};

module.exports = { postProduct };
