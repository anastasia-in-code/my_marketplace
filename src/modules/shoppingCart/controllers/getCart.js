const { CartRepository } = require('../cart.repository');
const { authService } = require('../../authorization/authService');

const getCart = async (ctx) => {
  let cartId = ctx.cookies.get('cartId');

  if (!cartId) {
    const token = ctx.request.header.authorization;

    let newCart = {};
    if (token) {
      const user = await authService.getUserByToken(token.split(' ')[1]);

      newCart = await CartRepository.create(user.id);
    } else {
      newCart = await CartRepository.create();
    }
    cartId = newCart.id;
    ctx.cookies.set('cartId', newCart.id);

    return {
      products: [],
      totalAmount: 0,
    };
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
