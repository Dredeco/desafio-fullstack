import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api',
});

const authClient = axios.create({
  baseURL: 'http://localhost:5001/auth',
});

export { apiClient, authClient };

export default {
  async getUser(id) {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  },

  async getUserByEmail(email) {
    const response = await apiClient.get(`/user/email/${email}`);
    return response.data;
  },

  async createUser(user) {
    const response = await apiClient.post('/user', user);
    return response.data;
  },

  async updateUser(id, user) {
    const response = await apiClient.put(`/user/${id}`, user);
    return response.data;
  },

  async deleteUser(id) {
    await apiClient.delete(`/user/${id}`);
  },
};