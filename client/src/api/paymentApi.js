import httpClient from './httpClient';

const paymentApi = {
  getStripeApiKey: (order) => {
    const url = '/checkout/stripeapikey';

    return httpClient.get(url);
  },

  processPayment: (paymentData) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const url = '/checkout/payment';

    return httpClient.post(url, paymentData, config);
  },
};
export default paymentApi;
