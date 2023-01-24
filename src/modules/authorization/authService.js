const jwt = require('jsonwebtoken');
const config = require('../../../config');
const { UserRepository } = require('../users/user.repository');

const signAccessToken = (payload) => jwt.sign(
  payload,
  config.accessTokenSecretKey,
  { expiresIn: config.accessTokenLiveTime },
);

const signRefreshToken = (payload) => jwt.sign(
  payload,
  config.refreshTokenSecretKey,
  { expiresIn: config.refreshTokenLiveTime },
);

const authService = {
  async getTokens(user) {
    const accessToken = signAccessToken({
      id: user.id,
      type: 'JWTAccess',
    });
    const refreshToken = signRefreshToken({
      id: user.id,
      type: 'JWTRefresh',
    });

    const decodedAT = jwt.decode(accessToken);
    const decodedRT = jwt.decode(refreshToken);

    return [
      {
        accessToken,
        ExpirationDate: Date(decodedAT.exp),
      },
      {
        refreshToken,
        ExpirationDate: Date(decodedRT.exp),
      },
    ];
  },

  async getUserByToken(token) {
    const decodedAT = await jwt.decode(token);
    const user = await UserRepository.findById(decodedAT.id);
    return user;
  },
};

module.exports = { authService };
