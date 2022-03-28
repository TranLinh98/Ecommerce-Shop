import httpClient from './httpClient';

const userApi = {
  login: (email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const url = `/auth/login`;

    return httpClient.post(url, { email, password }, config);
  },

  register: (userData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const url = `/auth/register`;

    return httpClient.post(url, userData, config);
  },

  loadUser: () => {
    const url = `/users/me`;

    return httpClient.get(url);
  },

  updateProfile: (userData) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const url = `/users/me/update`;

    return httpClient.put(url, userData, config);
  },

  updatePassword: (passwords) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const url = `/users/password/update`;

    return httpClient.put(url, passwords, config);
  },

  getAllUsers: () => {
    const url = `/users/admin`;

    return httpClient.get(url);
  },

  getUserDetails: (id) => {
    const url = `/users/admin/${id}`;

    return httpClient.get(url);
  },

  updateUser: (id, userData) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const url = `/users/admin/${id}`;

    return httpClient.put(url, userData, config);
  },

  deleteUser: (id) => {
    const url = `/users/admin/${id}`;

    return httpClient.delete(url);
  },
};

export default userApi;
