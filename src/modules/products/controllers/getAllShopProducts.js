const { ProductRepository } = require('../product.repository');

const getAllShopProducts = async (ctx) => {
  const { page, limit } = ctx.query;
  const { id: shopID } = ctx.params;

  const results = await ProductRepository.getAllByShop(shopID, page, limit);
  return results;
};

module.exports = { getAllShopProducts };
