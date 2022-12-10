import axios from 'axios';

import { getToken } from '../helpers/helpers.utils';

// constants
import { API_URL } from './../constants/constants';

const setToken = () => {
  const token = getToken();
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

export const getRewards = async () => {
  setToken();

  try {
    let response = await axios({
      method: 'get',
      url: `${API_URL}/users/rewards`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
