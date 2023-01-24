const { UserRepository } = require('../user.repository');
const { authService } = require('../../authorization/authService');

const createUser = async (ctx) => {
  const newUserData = ctx.request.body;
  const newUser = await UserRepository.create(newUserData);

  const tokens = await authService.getTokens(newUser);

  return tokens;
};

module.exports = { createUser };
