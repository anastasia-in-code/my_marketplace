const { ShopRepository } = require('../shop.repository');

const patchShop = async (ctx) => {
  const newShopData = ctx.request.body;
  const { id } = ctx.params;
  const shop = await ShopRepository.findByUUID(id);
  const updatedShop = await ShopRepository.update(shop, newShopData);

  return updatedShop;
};

module.exports = { patchShop };
