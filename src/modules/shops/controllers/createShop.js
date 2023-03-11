const { ShopRepository } = require('../shop.repository');
const { UserRepository } = require('../../users/index');

const createShop = async (ctx) => {
  const newShopData = ctx.request.body;

  const admin = await UserRepository.findByEmail(newShopData.email);

  const newShop = await ShopRepository.create(newShopData, admin);

  return newShop;
};

module.exports = { createShop };
