const { Sales, SalesProducts, Products } = require('../models');

const registerSale = async (
  userId,
  totalPrice,
  delivery,
  saleDate,
  status,
  products,
) => {
  const { address, number } = delivery;

  const sale = await Sales.create(
    {
      userId,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: number,
      saleDate,
      status,
    }
  );

  const saleId = sale.dataValues.id;

  if (!sale) {
    return {
      err: {
        code: 'invalid_entries',
        message: 'The sale could not be registered',
      },
    };
  }

  await Promise.all(
    products.map(({ id, amount }) => SalesProducts.create({ saleId, productId: id, quantity: amount })),
  );

  return { message: 'Compra realizada com sucesso!' };
};

const salesDetailsById = async (saleId) => {
  try {
    const sales = await Sales.findByPk(
      saleId,
      {
        include: [{ model: Products, as: 'products', attributes: {
          exclude: ['urlImage'],
        } }],
        raw: true,
      }
    );
    return sales;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllOrders = async () => Sales.findAll();

const getAllClientOrders = async (userId) => Sales.findAll({ where: { userId }, raw:true });

const updateOrderStatus = async (id) => Sales.update({status: 'Entregue'}, { where: { id }});

module.exports = {
  registerSale,
  getAllOrders,
  getAllClientOrders,
  salesDetailsById,
  updateOrderStatus,
};
