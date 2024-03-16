import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5001/api/task',
});

export default {
  async getTasks() {
    const response = await apiClient.get('/');
    return response.data;
  },

  async addTask(task) {
    const response = await apiClient.post('/', task);
    return response.data;
  },

  async getTaskById(id) {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  },

  async editTask(id, updatedTask) {
    const response = await apiClient.put(`/${id}`, updatedTask);
    return response.data;
  },

  async deleteTask(id) {
    await apiClient.delete(`/${id}`);
  },
};