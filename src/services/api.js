import axios from 'axios';

const API_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = '70axWVYEi3hULCyCtzd3d_6Eu-Bugl6Z3j8F17tKNAU';

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        query: query,
        page: page,
        per_page: 12,
        client_id: ACCESS_KEY,
      },
    });

   
    if (response.status === 200) {
      return response.data;
    }

    throw new Error('Unexpected response from Unsplash API');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Error:', error.message || error);
    }
    throw new Error('Error fetching images from Unsplash');
  }
};