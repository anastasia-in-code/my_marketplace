const { ShopRepository } = require('../shop.repository');

const getShop = async (ctx) => {
  const { id } = ctx.params;

  const shopData = await ShopRepository.findByUUID(id);

  return shopData;
};

module.exports = { getShop };
