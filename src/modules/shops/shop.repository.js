const uuid = require('uuid');
const { ShopModel } = require('./shop.model');

const ShopRepository = {
  async generateUUID() {
    return uuid.v4();
  },

  async create(shopData, admin) {
    const newShop = await ShopModel.query().insertGraph({
      uuid: await this.generateUUID(),
      name: shopData.name,
      phone_number: [
        {
          number: shopData.number,
          type: 'shop',
        },
      ],
    });

    await newShop.$relatedQuery('admins').relate({ id: admin.id, user_role: 'admin' });

    return newShop;
  },

  async findByName(name) {
    const result = await ShopModel.query()
      .where('name', name);
    return result;
  },

  async findById(id) {
    const result = await ShopModel.query().findById(id);
    return result;
  },

  async findByUUID(uuid) {
    const result = await ShopModel.query()
      .where('uuid', uuid);
    return result;
  },

  async addAdmin(shop, admin, role) {
    const alreadyAssigned = await shop.$relatedQuery('admins')
      .where('id', admin.id);

    if (alreadyAssigned.length > 0) {
      return `${admin.first_name} ${admin.last_name} is already an ${alreadyAssigned[0].user_role} of the ${shop.name}`;
    }
    await shop.$relatedQuery('admins').relate({ id: admin.id, user_role: role });

    return shop;
  },

  async getAdminsByUUID(uuid) {
    const shop = await ShopModel.query()
      .where('uuid', uuid);

    const admins = await shop[0].$relatedQuery('admins');

    return admins;
  },
};

module.exports = { ShopRepository };
