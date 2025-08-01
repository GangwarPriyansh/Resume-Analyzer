import axios from 'axios';

// Base URL should point to specific endpoints
const API_URL = 'https://resume-analyzer-6lys.onrender.com/api/profile';

// Get user profile
export const getProfile = async (token) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}` // Standard format
    }
  };

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    console.error('Profile fetch error:', error);
    throw error.response?.data || { message: 'Failed to fetch profile' };
  }
};

// Update profile
export const updateProfile = async (profileData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    const response = await axios.put(API_URL, profileData, config);
    return response.data;
  } catch (error) {
    console.error('Update error:', error);
    throw error.response?.data || { message: 'Profile update failed' };
  }
};

// Upload profile photo
export const uploadPhoto = async (photoFile, token) => {
  const formData = new FormData();
  formData.append('photo', photoFile);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  };

  try {
    // Note the corrected endpoint (/upload instead of /uploads)
    const response = await axios.post(`${API_URL}/upload`, formData, config);
    return response.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error.response?.data || { message: 'Photo upload failed' };
  }
};