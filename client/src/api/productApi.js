import httpClient from './httpClient';

const productApi = {
  getProduct: (keyword, currentPage, price, category, ratings) => {
    let url;
    url = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if (category) {
      url = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }

    return httpClient.get(url);
  },

  getAdminProduct: () => {
    const url = '/products/admin';

    return httpClient.get(url);
  },

  createProduct: (productData) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const url = `/products/admin`;

    return httpClient.post(url, productData, config);
  },

  updateProduct: (id, productData) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const url = `/products/admin/${id}`;

    return httpClient.put(url, productData, config);
  },

  newReview: (reviewData) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const url = `/products/review`;

    return httpClient.put(url, reviewData, config);
  },

  getAllReviews: (id) => {
    const url = `/products/reviews?id=${id}`;

    return httpClient.get(url);
  },

  getProductDetails: (id) => {
    const url = `/products/${id}`;

    return httpClient.get(url);
  },

  deleteProduct: (id) => {
    const url = `/products/admin/${id}`;

    return httpClient.delete(url);
  },

  deleteReviews: (reviewId, productId) => {
    const url = `/products/reviews?id=${reviewId}&productId=${productId}`;

    return httpClient.delete(url);
  },
};

export default productApi;
