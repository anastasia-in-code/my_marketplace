const { ShopRepository } = require('../shop.repository');
const { UserRepository } = require('../../users/index');

const addAdminOrEditor = async (ctx) => {
  const requestData = ctx.request.body;
  const shopId = ctx.params.id;

  const admin = await UserRepository.findByEmail(requestData.newAdminEmail);
  const shop = await ShopRepository.findByUUID(shopId);

  const shopData = await ShopRepository.addAdmin(shop[0], admin[0], requestData.role);

  return shopData;
};

module.exports = { addAdminOrEditor };
