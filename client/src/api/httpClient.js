import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

httpClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.accessToken;
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default httpClient;
