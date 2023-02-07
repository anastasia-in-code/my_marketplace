const { Model } = require('objection');

class ShopModel extends Model {
  static get tableName() {
    return 'shops';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        name: { type: 'string', minLength: 1, maxLength: 20 },
      },
    };
  }

  static relationMappings() {
    // eslint-disable-next-line global-require
    const { PhoneNumberModel } = require('../phone_numbers/phone_number.model');
    // eslint-disable-next-line global-require
    const { UserModel } = require('../users/index');

    return {
      phone_number: {
        relation: Model.BelongsToOneRelation,
        modelClass: PhoneNumberModel,
        join: {
          from: 'shops.phone_number_id',
          to: 'phone_numbers.id',
        },
      },

      admins: {
        relation: Model.ManyToManyRelation,
        modelClass: UserModel,
        join: {
          from: 'shops.id',
          through: {
            from: 'users_shops.shop_id',
            to: 'users_shops.user_id',
            extra: ['user_role'],
          },
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = { ShopModel };
