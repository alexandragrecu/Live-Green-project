import axios from 'axios';

import { getToken } from '../helpers/helpers.utils';

// constants
import { API_URL } from './../constants/constants';

const setToken = () => {
  const token = getToken();
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

export const updateData = async (data) => {
  setToken();

  try {
    let response = await axios({
      method: 'patch',
      url: `${API_URL}/users/updateMyData`,
      data,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const changePassword = async (data) => {
  setToken();

  try {
    let response = await axios({
      method: 'patch',
      url: `${API_URL}/users/updatePassword`,
      data,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
