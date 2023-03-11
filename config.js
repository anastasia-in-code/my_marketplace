require('dotenv').config();

const config = {
  accessTokenSecretKey: process.env.ACCESS_SECRET_KEY,
  accessTokenLiveTime: process.env.ACCESS_TOKEN_LIVETIME,
  refreshTokenSecretKey: process.env.REFRESH_SECRET_KEY,
  refreshTokenLiveTime: process.env.REFRESH_TOKEN_LIVETIME,
  productImageRepository: process.env.PRODUCT_IMAGE_REPOSITORY_NAME,
};

module.exports = config;
