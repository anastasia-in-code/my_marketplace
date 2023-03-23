const { ProductRepository } = require('../product.repository');

const postProduct = async (ctx) => {
  const { shopId } = ctx.params;
  const { body: newProductData } = ctx.request;
<<<<<<< HEAD
  if (ctx.request.file) {
    newProductData.file = ctx.request.file;
  }
=======
  newProductData.file = ctx.request.file;
>>>>>>> 3744c2defba3d6d8b2308f7852ad43f450a3a4bd

  const newProduct = await ProductRepository.create(newProductData, shopId);

  return newProduct;
};

module.exports = { postProduct };
