const { ShopRepository } = require('../shop.repository');
const { UserRepository } = require('../../users/index');

const addAdminOrEditor = async (ctx) => {
  const { body: requestData } = ctx.request;
  const { id } = ctx.params;

  const admin = await UserRepository.findByEmail(requestData.newAdminEmail);
  const shop = await ShopRepository.findByUUID(id);

  const shopData = await ShopRepository.addAdmin(shop, admin, requestData.role);

  return shopData;
};

module.exports = { addAdminOrEditor };
