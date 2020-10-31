module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sales',
    {
      userId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    { timestamps: true, createdAt: 'saleDate', updatedAt: false }
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return Sale;
};
