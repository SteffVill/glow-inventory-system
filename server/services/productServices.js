import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export const productService = { 
  getAll: () => axios.get(`${API_URL}/all`),  

  create: (data) => axios.post(`${API_URL}/create`, data),  

  update: (id, data) => axios.put(`${API_URL}/${id}`, data),
  
  delete: (id) => axios.delete(`${API_URL}/${id}`)
};