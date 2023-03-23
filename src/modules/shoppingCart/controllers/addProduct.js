const { CartRepository } = require('../cart.repository');
const { cartService } = require('../cartService');

const addProduct = async (ctx) => {
  const { productId } = ctx.params;
  let cartId = ctx.cookies.get('cartId');

  if (!cartId) {
    const token = ctx.request.header.authorization;
    const newCart = await cartService.getCart(cartId, token);

    cartId = newCart.id;
    ctx.cookies.set('cartId', newCart.id);
  }

  const productAdded = await CartRepository.addProduct(cartId, productId);

  return productAdded;
};

module.exports = { addProduct };
