const { authService } = require('../authService');

const updateTokens = async (ctx) => {
  const { user } = ctx.req;
  const newTokens = await authService.getTokens(user);

  return newTokens;
};

module.exports = { updateTokens };
