import api from './api';
import Cookies from 'js-cookie';

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ApiKey {
  keyId: string;
  createdAt: string;
  lastUsed?: string;
}

export const authApi = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: { name?: string; email?: string }) => {
    const response = await api.put('/auth/me', data);
    return response.data;
  },

  changePassword: async (data: { oldPassword: string; newPassword: string }) => {
    const response = await api.put('/auth/me/password', data);
    return response.data;
  },

  getApiKeys: async () => {
    const response = await api.get('/auth/api-keys');
    return response.data;
  },

  createApiKey: async () => {
    const response = await api.post('/auth/api-keys');
    return response.data;
  },

  revokeApiKey: async (keyId: string) => {
    const response = await api.delete(`/auth/api-keys/${keyId}`);
    return response.data;
  },
};

export const setAuthToken = (token: string, user: User) => {
  Cookies.set('token', token, { expires: 7, sameSite: 'strict' });
  Cookies.set('user', JSON.stringify(user), { expires: 7, sameSite: 'strict' });
};

export const clearAuthToken = () => {
  Cookies.remove('token');
  Cookies.remove('user');
};

export const getStoredUser = (): User | null => {
  const userStr = Cookies.get('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const getStoredToken = (): string | null => {
  return Cookies.get('token') || null;
};