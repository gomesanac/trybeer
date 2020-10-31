const { Products } = require('../models');

const getAllProducts = async () => Products.findAll({ raw: true });

module.exports = {
  getAllProducts,
};