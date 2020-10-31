module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    { timestamps: false },
  );

  User.associate = (models) => {
    User.hasMany(models.Sales, { foreignKey: 'userId', as: 'sales' });
  };

  return User;
};
