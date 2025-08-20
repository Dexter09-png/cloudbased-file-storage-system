import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  }
);

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/files/upload', formData);
};

export const getFiles = () => API.get('/files');

export const getDownloadUrl = (fileId, version) =>
  API.get(`/files/${fileId}/download${version !== undefined ? `?version=${version}` : ''}`);

export const getVersions = (fileId) => API.get(`/files/${fileId}/versions`);

export const shareFile = (fileId, email) =>
  API.post(`/files/${fileId}/share`, { email });