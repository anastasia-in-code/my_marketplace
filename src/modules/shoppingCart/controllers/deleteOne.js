const { CartRepository } = require('../cart.repository');

const deleteOne = async (ctx) => {
  const { productId } = ctx.params;
  const cartId = ctx.cookies.get('cartId');

  const updatedProducts = await CartRepository.deleteOne(productId, cartId);

  return updatedProducts;
};

module.exports = { deleteOne };
