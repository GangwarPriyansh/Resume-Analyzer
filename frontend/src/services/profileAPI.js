import axios from 'axios';

const API_URL = 'https://resume-analyzer-6lys.onrender.com/api/';

// Get user profile
export const getProfile = async (token) => {
  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update profile
export const updateProfile = async (profileData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };

  try {
    const response = await axios.put(API_URL, profileData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Upload profile photo
export const uploadPhoto = async (photoFile, token) => {
  const formData = new FormData();
  formData.append('photo', photoFile);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': token,
    },
  };

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, config);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};