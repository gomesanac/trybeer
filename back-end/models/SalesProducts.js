module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    'SalesProducts',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    { timestamps: false }
  );

  SaleProduct.associate = (models) => {
    models.Products.belongsToMany(models.Sales, {
      as: 'sales',
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });

    models.Sales.belongsToMany(models.Products, {
      as: 'products',
      through: SaleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
  };

  return SaleProduct;
};
