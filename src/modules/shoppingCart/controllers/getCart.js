const { CartRepository } = require('../cart.repository');
const { cartService } = require('../cartService');

const getCart = async (ctx) => {
  let cartId = ctx.cookies.get('cartId');

  if (!cartId) {
    const token = ctx.request.header.authorization;
    const newCart = await cartService.getCart(cartId, token);

    cartId = newCart.id;
    ctx.cookies.set('cartId', newCart.id);
  }

  const products = await CartRepository.getProducts(cartId);

  const totalAmount = products.reduce((sum, product) => {
    // eslint-disable-next-line no-param-reassign
    sum += product.quantity * product.price;
    return sum;
  }, 0);

  return {
    products,
    totalAmount,
  };
};

module.exports = { getCart };
