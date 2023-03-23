const { authService } = require('../authorization/authService');
const { CartRepository } = require('./cart.repository');

const cartService = {
  async getCart(token) {
    let cart = {};
    if (token) {
      const user = await authService.getUserByToken(token.split(' ')[1]);

      cart = await CartRepository.getCartByUserId(user.id);

      if (!cart) {
        cart = await CartRepository.create(user.id);
      }
    } else {
      cart = await CartRepository.create();
    }

    return cart;
  },

  async mergeCarts(cartId, userId) {
    const userCart = await CartRepository.getCartByUserId(userId);
    const sessionProduct = await CartRepository.getProducts(cartId);

    sessionProduct.forEach(async (product) => {
      await CartRepository.addFromCart(userCart.id, product);
    });

    await CartRepository.delete(cartId);

    return userCart.id;
  },
};

module.exports = { cartService };
