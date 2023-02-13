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
      price: newProductData.price,
      description: newProductData.description,
    });

    return newProduct;
  },

  async findByUUID(uuid) {
    const result = await ProductModel.query().findById(uuid);

    return result;
  },

  async update(product, newProductData) {
    const updatedProduct = await ProductModel.query().patchAndFetchById(product.id, {
      name: newProductData.newName,
      price: newProductData.newPrice,
      description: newProductData.newDescription,
    });

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

    return pageWithData;
  },

};

module.exports = { ProductRepository };
