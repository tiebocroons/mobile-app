import { API_KEY } from '@env';

export const API_CONFIG = {
  BASE_URL: 'https://api.webflow.com/v2',
  API_KEY,
  HEADERS: {
    Authorization: `Bearer ${API_KEY}`,
  },
};