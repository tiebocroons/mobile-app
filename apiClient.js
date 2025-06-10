import axios from 'axios';
import { API_CONFIG } from './apiConfig';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    ...API_CONFIG.HEADERS,
    'Cache-Control': 'no-cache', // Prevent caching
  },
});

// Fetch data from the API
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('API GET Error:', error.response?.data || error.message);
    throw new Error('An error occurred while fetching data.');
  }
};

// Update data in the API
export const updateData = async (endpoint, payload) => {
  try {
    const response = await apiClient.put(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('API PUT Error:', error.response?.data || error.message);
    throw new Error('An error occurred while updating data.');
  }
};

// Create new data in the API
export const createData = async (endpoint, payload) => {
  try {
    const response = await apiClient.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error('API POST Error:', error.response?.data || error.message);
    throw new Error('An error occurred while creating data.');
  }
};

// Delete data from the API
export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('API DELETE Error:', error.response?.data || error.message);
    throw new Error('An error occurred while deleting data.');
  }
};

const handleRefresh = async () => {
  setRefreshing(true);
  await fetchProducts();
  setRefreshing(false);
};

export default apiClient;