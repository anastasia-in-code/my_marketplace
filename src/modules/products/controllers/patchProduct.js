const { ProductRepository } = require('../product.repository');

const patchProduct = async (ctx) => {
  const newProductData = ctx.request.body;
  const { productId } = ctx.params;
  const product = await ProductRepository.findByUUID(productId);
  const updatedProduct = await ProductRepository.update(product, newProductData);

  return updatedProduct;
};

module.exports = { patchProduct };
