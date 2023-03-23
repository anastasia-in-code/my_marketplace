const { cartService } = require('../../shoppingCart/cartService');
const { authService } = require('../authService');

const loginUser = async (ctx) => {
  const { user } = ctx.req;
  const tokens = await authService.getTokens(user);
<<<<<<< HEAD
=======
  let cartId = ctx.cookies.get('cartId');

  if (cartId) {
    cartId = await cartService.mergeCarts(cartId, user.id);
    ctx.cookies.set('cartId', cartId);
  }

>>>>>>> 55b8bb6... shopping card service
  return tokens;
};

module.exports = { loginUser };
