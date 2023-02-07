const uuid = require('uuid');
const { ShopModel } = require('./shop.model');

const ShopRepository = {
  async generateUUID() {
    return uuid.v4();
  },

  async create(shopData, admin) {
    const newShop = await ShopModel.query().insertGraph({
      id: await this.generateUUID(),
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

  async findByUUID(uuid) {
    const result = await ShopModel.query().findById(uuid);

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
      .where('id', uuid);

    const admins = await shop[0].$relatedQuery('admins');

    return admins;
  },

  async update(shop, newShopData) {
    if (newShopData.newName) {
      await ShopModel.query().patchAndFetchById(shop.id, {
        name: newShopData.newName,
      });
    }
    if (newShopData.newPhoneNumber) {
      await ShopModel.query().upsertGraph({
        id: shop.id,
        phone_number: {
          number: newShopData.newPhoneNumber,
        },
      });
    }
    const updatedShop = await ShopModel.query().findById(shop.id);
    return updatedShop;
  },

};

module.exports = { ShopRepository };
