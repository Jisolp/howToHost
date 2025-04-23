// src/api/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',  // adjust if backend port changes
});

// Reservation APIs 
export const createReservation = (data) => API.post('/reservation', data);
export const getReservations = () => API.get('/reservation');
export const getReservationByName = (id) => API.get(`/reservation/${id}`);
export const updateReservation = (id, data) => API.put(`/reservation/${id}`, data);
export const deleteReservation = (id) => API.delete(`/reservation/${id}`);
export const getReservationsByTable = (tableId) => API.get(`/reservation/table/${tableId}`);

// Search API
export const searchReservation = (data) => API.post('/search',data);

// Section APIs
export const createSection = (data) => API.post('/section', data);
export const getSections = () => API.get('/section');
export const getSectionById = (id) => API.get(`/section/${id}`);
export const deleteSection = (id) => API.delete(`/section/${id}`);

// Server APIs
export const createServer = (data) => API.post('/server', data);
export const getServers = () => API.get('/server');
export const getServerById = (id) => API.get(`/server/${id}`);
export const deleteServer = (id) => API.delete(`/server/${id}`);
export const getServerTableCount = (id) => API.get(`/server/${id}/tables`);

// Table APIs
export const createTable = (data) => API.post('/table', data);
export const getTables = () => API.get('/table');
export const getTableById = (id) => API.get(`/table/${id}`);
export const updateTable = (id, data) => API.put(`/table/${id}`, data);
export const deleteTable = (id) => API.delete(`/table/${id}`);
export const fetchTables = async () => {
  try {
    const res = await getTables();
    return res.data;
  } catch (err) {
    console.error('Error fetching tables', err);
    return [];
  }
};