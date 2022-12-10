import axios from 'axios';

// constants
import { API_URL } from './../constants/constants';

export const getArticles = async () => {
  try {
    let response = await axios({
      method: 'get',
      url: `${API_URL}/articles`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
