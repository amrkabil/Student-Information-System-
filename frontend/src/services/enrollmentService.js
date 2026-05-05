import api from './api';

const getAll = async () => {
  const response = await api.get('/api/enrollments');
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/api/enrollments/${id}`);
  return response.data;
};

const create = async (data) => {
  const response = await api.post('/api/enrollments', data);
  return response.data;
};

const update = async (id, data) => {
  const response = await api.put(`/api/enrollments/${id}`, data);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/api/enrollments/${id}`);
  return response.data;
};

const enrollmentService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default enrollmentService;
