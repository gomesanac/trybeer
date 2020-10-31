import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import MenuTop from '../components/MenuTop';
import { getOneOrder } from '../services/ordersService';
import formatDate from '../utils/formatDate';
import formatPrice from '../utils/formatPrice';
import { getFromLocalStorage } from '../utils/saveToLocalStorage';
import Sidebar from '../components/Sidebar.jsx';

function ClientOrderDetail({ match }) {
  const [order, setOrder] = useState(null);
  const user = getFromLocalStorage();

  const token = user ? user.token : '';
  const { id } = match.params;

  const fetchOrder = async (id, token) =>
    getOneOrder(id, token).then((order) => setOrder(order.sale));

  useEffect(() => {
    fetchOrder(id, token);
  }, []);

  if (!user) return <Redirect to="/login" />;

  console.log(order);

  /*

            deliveryAddress: "Jarangari"
            deliveryNumber: "53"
            id: 1
            products.id: 2
            products.name: "Heineken 600ml"
            products.price: 7.5
            products.urlImage: "http://localhost:3001/images/Heineken 600ml.jpg"
            saleDate: "2020-10-31T22:33:30.000Z"
            status: "Pendente"
            totalPrice: 16.97
            userId: 2

  */

  return (
    <div>
      <MenuTop pageTitle="Detalhes de Pedido" />
      <Sidebar />
      <div id="wrapper" className="order-details-page container">
        {order ? (
          <div className="card">
            <div className="card-header">
              <h3
                className="card-text"
                data-testid="order-number"
              >{`Pedido ${order && order[0].id}`}</h3>
              <p className="card-text" data-testid="order-date">
                {formatDate(order && order[0].saleDate)}
              </p>
            </div>
            <ul className="list-group list-group-flush">
              {order && order.map(
                (
                  el,
                  index
                ) => (
                  <li className="list-group-item" key={el["products.id"]}>
                    <div>
                      <h4 data-testid={`${index}-product-name`}>
                        {el["products.name"]}
                      </h4>
                      <p
                        data-testid={`${index}-product-qtd`}
                      >{`Quantidade: ${0}`}</p>
                      <p data-testid={`${index}-product-total-value`}>
                        {`Total do produto: R$ ${formatPrice(
                          el["products.price"] * 1
                        )}`}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>
            <div className="card-footer">
              <h3 className="card-text" data-testid="order-total-value">
                {`Total: R$ ${order ? formatPrice(order[0].totalPrice): '0,00'}`}
              </h3>
            </div>
          </div>
        ) : (
          <h1 className="text-center message-geral">{order ? 'O pedido não foi encontrado' : 'Loading...'}</h1>
        )}
      </div>
    </div>
  );
}

export default ClientOrderDetail;
