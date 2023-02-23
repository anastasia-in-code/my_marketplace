const uuid = require('uuid');
const { ProductModel } = require('./product.model');
const { ShopRepository } = require('../shops/shop.repository');

const ProductRepository = {
  async generateUUID() {
    return uuid.v4();
  },

  async create(newProductData, shopId) {
    const shop = await ShopRepository.findByUUID(shopId);
    const newProduct = await shop.$relatedQuery('product').insert({
      id: await this.generateUUID(),
      name: newProductData.name,
      price: Math.round(newProductData.price * 100),
      description: newProductData.description,
    });

    newProduct.price = newProductData.price;

    return newProduct;
  },

  async findByUUID(uuid) {
    const result = await ProductModel.query().findById(uuid);
    result.price /= 100;

    return result;
  },

  async update(product, newProductData) {
    const updatedProduct = await ProductModel.query().patchAndFetchById(product.id, {
      name: newProductData.newName,
      price: Math.round(newProductData.newPrice * 100),
      description: newProductData.newDescription,
    });

    updatedProduct.price = newProductData.newPrice;

    return updatedProduct;
  },

  async delete(productID) {
    const deleted = await ProductModel.query().deleteById(productID);
    return deleted;
  },

  async getAllByShop(shopID, page, limit) {
    const pageWithData = await ProductModel.query()
      .where('shop_id', '=', shopID)
      .page(page - 1, limit);

    pageWithData.results.forEach((product) => product.price /= 100);

    return pageWithData;
  },

};

module.exports = { ProductRepository };
