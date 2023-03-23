const { ProductRepository } = require('../product.repository');

const patchProduct = async (ctx) => {
  const newProductData = ctx.request.body;
  const { productId } = ctx.params;
<<<<<<< HEAD

=======
>>>>>>> 3744c2defba3d6d8b2308f7852ad43f450a3a4bd
  const product = await ProductRepository.findByUUID(productId);
  const updatedProduct = await ProductRepository.update(product, newProductData);

  return updatedProduct;
};

module.exports = { patchProduct };
