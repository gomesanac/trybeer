const { generateJWT } = require('../middlewares');
const { usersModel } = require('../models');

const userLogin = async (email, pass) => {
  const user = await usersModel.getUserByEmail(email);

  if (!user || user.password !== pass) {
    return {
      err: { code: 'invalid_entries', message: 'Wrong email or password' },
    };
  }

  const { password, ...userData } = user;

  const { token } = generateJWT(userData);

  return {
    name: user.name,
    email: user.email,
    token,
    role: user.role,
  };
};

const registerUser = async (name, email, password, role) => {
  try {
    await usersModel.registerUser(name, email, password, role);

    return userLogin(email, password);
  } catch (err) {
    const { info } = err;

    if (info.code === 1062) {
      return {
        err: { code: 'invalid_entries', message: 'E-mail already registered' },
      };
    }

    return {
      err: { code: info.code, message: info.msg },
    };
  }
};

module.exports = {
  userLogin,
  registerUser,
};