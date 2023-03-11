const { ShopRepository } = require('../shop.repository');

const patchShop = async (ctx) => {
  const newShopData = ctx.request.body;
  const { shopId } = ctx.params;
  const shop = await ShopRepository.findByUUID(shopId);

  const updatedShop = await ShopRepository.update(shop, newShopData);

  return updatedShop;
};

module.exports = { patchShop };
