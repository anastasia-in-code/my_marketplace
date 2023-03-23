const { ShopRepository } = require('../shop.repository');

const getShop = async (ctx) => {
  const { shopId } = ctx.params;

  const shopData = await ShopRepository.findByUUID(shopId);

  return shopData;
};

module.exports = { getShop };
