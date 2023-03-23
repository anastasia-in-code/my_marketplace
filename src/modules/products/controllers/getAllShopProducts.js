const { ProductRepository } = require('../product.repository');

const getAllShopProducts = async (ctx) => {
  const { page, limit } = ctx.query;
  const { shopId } = ctx.params;

  const results = await ProductRepository.getAllByShop(shopId, page, limit);
  return results;
};

module.exports = { getAllShopProducts };
