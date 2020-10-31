'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.DECIMAL(4,2),
        allowNull: false,
      },
      urlImage: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
    }),

  down: async (queryInterface, _Sequelize) =>
    queryInterface.dropTable('Products'),
};
