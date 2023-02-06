const { ShopRepository } = require('../shop.repository');

const patchShop = async (ctx) => {
  const newShopData = ctx.request.body;
  const shop = await ShopRepository.findByUUID(ctx.params.id);
  const updatedShop = await ShopRepository.update(shop[0], newShopData);

  return updatedShop;
};

module.exports = { patchShop };
