import api from './api';

const getAll = async () => {
  const response = await api.get('/api/students');
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/api/students/${id}`);
  return response.data;
};

const create = async (data) => {
  const response = await api.post('/api/students', data);
  return response.data;
};

const update = async (id, data) => {
  const response = await api.put(`/api/students/${id}`, data);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/api/students/${id}`);
  return response.data;
};

const studentService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default studentService;
