const { authService } = require('../../authorization/authService');

const userProfile = async (ctx) => {
  const token = ctx.request.header.authorization.split(' ')[1];
  const user = await authService.getUserByToken(token);

  delete user.password;
  delete user.id;

  return user;
};

module.exports = { userProfile };
