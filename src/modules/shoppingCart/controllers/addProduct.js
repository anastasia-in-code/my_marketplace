const { CartRepository } = require('../cart.repository');

const addProduct = async (ctx) => {
  const { productId } = ctx.params;
  //   const { user } = ctx.req;
  let cartId = ctx.cookies.get('cartId');

  if (!cartId) {
    const newCart = await CartRepository.create();
    cartId = newCart.id;
    ctx.cookies.set('cartId', newCart.id);
  }

  const productAdded = await CartRepository.addProduct(cartId, productId);

  return productAdded;
};

module.exports = { addProduct };
