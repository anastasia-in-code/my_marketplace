const { Model } = require('objection');

class CartModel extends Model {
  static get tableName() {
    return 'carts';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id'],

      properties: {
        id: { type: 'string' },
        session_id: { type: 'string' },
        user_id: { type: 'integer' },
      },
    };
  }

  static relationMappings() {
    // eslint-disable-next-line global-require
    const { UserModel } = require('../users/user.model');

    return {
      shop: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'carts.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = { CartModel };
