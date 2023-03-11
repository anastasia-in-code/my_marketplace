const { ProductRepository } = require('../product.repository');

const deleteProduct = async (ctx) => {
  const { productId } = ctx.params;

  const product = await ProductRepository.findByUUID(productId);

  if (product) {
    const deleted = await ProductRepository.delete(productId);
    return deleted;
  }

  return { result: 'product doesn`t exist' };
};

module.exports = { deleteProduct };
