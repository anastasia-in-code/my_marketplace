const userProfile = async (ctx) => {
  const { user } = ctx.req;

  delete user.password;
  delete user.id;

  return user;
};

module.exports = { userProfile };
