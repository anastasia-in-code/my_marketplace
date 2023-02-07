const { authService } = require('../authService');

const loginUser = async (ctx) => {
  const { user } = ctx.req;
  const tokens = await authService.getTokens(user);
  return tokens;
};

module.exports = { loginUser };
