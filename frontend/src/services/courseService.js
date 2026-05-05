import api from './api';

const getAll = async () => {
  const response = await api.get('/api/courses');
  return response.data;
};

const getById = async (id) => {
  const response = await api.get(`/api/courses/${id}`);
  return response.data;
};

const create = async (data) => {
  const response = await api.post('/api/courses', data);
  return response.data;
};

const update = async (id, data) => {
  const response = await api.put(`/api/courses/${id}`, data);
  return response.data;
};

const remove = async (id) => {
  const response = await api.delete(`/api/courses/${id}`);
  return response.data;
};

const courseService = {
  getAll,
  getById,
  create,
  update,
  remove
};

export default courseService;
