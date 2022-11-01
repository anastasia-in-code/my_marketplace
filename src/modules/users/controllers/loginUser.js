const Boom = require('boom');
const { UserRepository } = require('../user.repository');
const { hashVerify } = require('../../../libs/hashPassword');
const { getJWT } = require('../../../libs/getJWT');

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
    const token = getJWT(tokenPayload);

    return ctx.set('Authorization', `Bearer ${token}`);
  }
  throw Boom.unauthorized('invalid email or password');
};

module.exports = { loginUser };
