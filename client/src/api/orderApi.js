import httpClient from './httpClient';

const orderApi = {
  createOrder: (order) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const url = '/orders/new';

    return httpClient.post(url, order, config);
  },

  myOrders: () => {
    const url = '/orders/me';

    return httpClient.get(url);
  },

  updateOrder: (id, order) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const url = `/orders/admin/${id}`;

    return httpClient.put(url, order, config);
  },

  getAllOrders: () => {
    const url = '/orders/admin';

    return httpClient.get(url);
  },

  getOrderDetails: (id) => {
    const url = `/orders/${id}`;

    return httpClient.get(url);
  },

  deleteOrder: (id) => {
    const url = `/orders/admin/${id}`;

    return httpClient.delete(url);
  },
};

export default orderApi;
