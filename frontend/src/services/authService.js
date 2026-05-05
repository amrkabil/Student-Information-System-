import api from './api';

const login = async (username, password) => {
  const response = await api.post('/api/auth/login', { username, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify({
      username: response.data.username,
      email: response.data.email,
      role: response.data.role
    }));
  }
  return response.data;
};

const logout = () => {
  localStorage.clear();
};

const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const getRole = () => {
  const user = getUser();
  return user ? user.role : null;
};

const authService = {
  login,
  logout,
  getUser,
  isAuthenticated,
  getRole
};

export default authService;
