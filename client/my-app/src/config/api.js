const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://add-backend-me45.onrender.com';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
  },
  CHAT: {
    SESSION: `${API_BASE_URL}/api/chat/session`,
    MESSAGE: `${API_BASE_URL}/api/chat/message`,
  },
  CAMPAIGN: {
    GENERATE: `${API_BASE_URL}/api/campaign/generate`,
    LAUNCH: `${API_BASE_URL}/api/campaign/launch`,
  },
};


export default API_BASE_URL; 
