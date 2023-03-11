const { ProductRepository } = require('../product.repository');

const getProduct = async (ctx) => {
  const { productId } = ctx.params;
  const productData = await ProductRepository.findByUUID(productId);
  return productData;
};

module.exports = { getProduct };
