const { cartService } = require('../../shoppingCart/cartService');
const { authService } = require('../authService');

const loginUser = async (ctx) => {
  const { user } = ctx.req;
  const tokens = await authService.getTokens(user);
<<<<<<< HEAD
  let cartId = ctx.cookies.get('cartId');

  if (cartId) {
    cartId = await cartService.mergeCarts(cartId, user.id);
    ctx.cookies.set('cartId', cartId);
  }
=======
>>>>>>> 3744c2defba3d6d8b2308f7852ad43f450a3a4bd

  return tokens;
};

module.exports = { loginUser };
