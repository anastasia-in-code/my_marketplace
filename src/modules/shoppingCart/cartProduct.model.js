const { Model } = require('objection');

class CartProductModel extends Model {
  static get tableName() {
    return 'cart_products';
  }

  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        name: { type: 'string', minLength: 1, maxLength: 20 },
        price: { type: 'integer' },
        description: { type: 'string', minLength: 0, maxLength: 120 },
        fileId: { type: 'string' },
      },
    };
  }

  static relationMappings() {
    // eslint-disable-next-line global-require
    const { ShopModel } = require('../shops/shop.model');

    return {
      shop: {
        relation: Model.BelongsToOneRelation,
        modelClass: ShopModel,
        join: {
          from: 'cart_products.shop_id',
          to: 'shops.id',
        },
      },
    };
  }
}

module.exports = { CartProductModel };
