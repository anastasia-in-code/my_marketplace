const { Model } = require('objection');

class ProductModel extends Model {
  static get tableName() {
    return 'products';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price'],

      properties: {
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
          from: 'products.shop_id',
          to: 'shops.id',
        },
      },
    };
  }
}

module.exports = { ProductModel };
