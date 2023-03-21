const { CartRepository } = require('../cart.repository');

const deleteProduct = async (ctx) => {
  const { productId } = ctx.params;
  const cartId = ctx.cookies.get('cartId');

  const deletedProduct = await CartRepository.deleteProduct(productId, cartId);

  return deletedProduct;
};

module.exports = { deleteProduct };
