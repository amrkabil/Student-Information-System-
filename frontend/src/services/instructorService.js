import api from './api';

const getAll = async () => {
  const response = await api.get('/api/instructors');
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/api/instructors/${id}`);
  return response.data;
};

const create = async (data) => {
  const response = await api.post('/api/instructors', data);
  return response.data;
};

const update = async (id, data) => {
  const response = await api.put(`/api/instructors/${id}`, data);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/api/instructors/${id}`);
  return response.data;
};

const instructorService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default instructorService;
