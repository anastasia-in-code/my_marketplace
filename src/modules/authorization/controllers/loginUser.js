const Boom = require('boom');
const { UserRepository } = require('../../users/user.repository');
const { hashVerify } = require('../../../libs/hashPassword');
const { authService } = require('../authService');

const loginUser = async (ctx) => {
  const userData = ctx.request.body;
  const userFound = await UserRepository.findByEmail(userData.email);
  if (!userFound.length) {
    throw Boom.unauthorized('invalid email or password');
  }

  const checkPassword = await hashVerify(userFound[0].password, userData.password);
  if (checkPassword) {
    const tokenPayload = {
      id: userFound[0].id,
      email: userFound[0].email,
    };
    const tokens = await authService.getTokens(tokenPayload);

    ctx.user = userFound[0];

    return tokens;
  }
  throw Boom.unauthorized('invalid email or password');
};

module.exports = { loginUser };
