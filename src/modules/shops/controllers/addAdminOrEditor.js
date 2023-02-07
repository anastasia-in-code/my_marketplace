const { ShopRepository } = require('../shop.repository');
const { UserRepository } = require('../../users/index');

const addAdminOrEditor = async (ctx) => {
  const requestData = ctx.request.body;
  const { id } = ctx.params;

  const admin = await UserRepository.findByEmail(requestData.newAdminEmail);
  const shop = await ShopRepository.findByUUID(id);

  const shopData = await ShopRepository.addAdmin(shop, admin[0], requestData.role);

  return shopData;
};

module.exports = { addAdminOrEditor };
