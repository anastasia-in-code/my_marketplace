const { ProductRepository } = require('../product.repository');

const deleteProduct = async (ctx) => {
  const { productId } = ctx.params;

  const deleted = await ProductRepository.delete(productId);

  return deleted ? 'product was deleted' : 'product doesn`t exist';
};

module.exports = { deleteProduct };
