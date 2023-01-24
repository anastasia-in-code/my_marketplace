const { ShopRepository } = require('../shop.repository');

const getShop = async (ctx) => {
  const shopId = ctx.params;

  const shopData = await ShopRepository.findByUUID(shopId.id);

  return shopData;
};

module.exports = { getShop };
