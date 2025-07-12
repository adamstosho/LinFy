import api from './api';

export interface ShortenedUrl {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  urlCode: string;
  qrCode: string;
  clicks: number;
  createdAt: string;
  lastAccessed: string;
}

export interface UrlHistory {
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
  clicks: number;
  qrCode: string;
}

export const urlApi = {
  shortenUrl: async (originalUrl: string) => {
    const response = await api.post('/shorten', { originalUrl });
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/history');
    return response.data;
  },

  getStats: async (code: string) => {
    const response = await api.get(`/stats/${code}`);
    return response.data;
  },
};