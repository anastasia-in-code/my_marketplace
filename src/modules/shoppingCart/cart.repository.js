const uuid = require('uuid');
const crypto = require('crypto');
const { CartModel } = require('./cart.model');
const { CartProductModel } = require('./cartProduct.model');
const { ProductRepository } = require('../products/product.repository');

const CartRepository = {
  async generateUUID() {
    return uuid.v4();
  },

  async create(userId) {
    const newCart = {
      id: await this.generateUUID(),
    };

    if (userId) {
      newCart.user_id = userId;
    } else {
      newCart.session_id = this.randomId();
    }

    const savedCart = await CartModel.query().insert(newCart);
    return savedCart;
  },

  async delete(cartId) {
    const deleted = await CartModel.query().deleteById(cartId);
    return deleted;
  },

  async getCartByUserId(userId) {
    const [cart] = await CartModel.query()
      .where('user_id', userId);

    return cart;
  },

  async updateProductQuantity(product, quantity = 1) {
    const updatedCartProduct = await CartProductModel.query()
      .patchAndFetchById(product.id, {
        quantity: product.quantity + quantity,
      });
    return updatedCartProduct;
  },

  async addNewProduct(product) {
    const savedProduct = await CartProductModel.query().insert(product);
    return savedProduct;
  },

  async addProduct(cartId, productId) {
    const product = await ProductRepository.findByUUID(productId);

    const [productExist] = await CartProductModel.query()
      .where('cart_id', cartId)
      .where('product_id', productId);

    if (productExist) {
      const savedProduct = await this.updateProductQuantity(productExist);
      return savedProduct;
    }

    const newCartProduct = {
      id: await this.generateUUID(),
      product_id: product.id,
      name: product.name,
      price: Math.round(product.price * 100),
      description: product.description,
      file_id: product.file_id,
      cart_id: cartId,
      shop_id: product.shop_id,
      changed: false,
      quantity: 1,
    };

    const savedProduct = await this.addNewProduct(newCartProduct);

    return savedProduct;
  },

  async addFromCart(cartId, product) {
    const [exist] = await CartProductModel.query()
      .where('cart_id', cartId)
      .where('product_id', product.product_id);

    if (exist) {
      await this.updateProductQuantity(exist, product.quantity);
    } else {
      await this.addProduct(cartId, product.product_id);
    }
  },

  async getProducts(cartId) {
    const products = await CartProductModel.query()
      .where('cart_id', cartId);

    return products;
  },

  async deleteProduct(productId, cartId) {
    const [product] = await CartProductModel.query()
      .where('cart_id', cartId)
      .where('product_id', productId);

    await CartProductModel.query().deleteById(product.id);

    return product;
  },

  async deleteOne(productId, cartId) {
    const [product] = await CartProductModel.query()
      .where('cart_id', cartId)
      .where('product_id', productId);

    if (product.quantity <= 1) {
      this.deleteProduct(productId, cartId);
    }

    const updatedCartProduct = await CartProductModel.query()
      .patchAndFetchById(product.id, {
        quantity: product.quantity - 1,
      });

    return updatedCartProduct;
  },

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  },

};

module.exports = { CartRepository };
