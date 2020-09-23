const rescue = require('express-rescue');
const { usersService } = require('../services');

const userLogin = rescue(async (req, res) => {
  const { email, password } = req.body;

  const user = await usersService.userLogin(email, password);

  if (user.err) {
    return res.status(401).json(user);
  }

  return res.status(200).json(user);
});

module.exports = userLogin;
