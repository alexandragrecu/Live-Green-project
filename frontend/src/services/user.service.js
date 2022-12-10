import axios from 'axios';

import { getToken } from '../helpers/helpers.utils';

// constants
import { API_URL } from './../constants/constants';

// get user data
export const getUser = async (params) => {
  const token = getToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  try {
    let response = await axios({
      method: 'get',
      url: `${API_URL}/users/user-data`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// get users
export const getUsers = async (params) => {
  const token = getToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

  try {
    let response = await axios({
      method: 'get',
      url: `${API_URL}/users`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// get validate points
export const validatePoints = async (params) => {
  const token = getToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  try {
    let response = await axios({
      method: 'patch',
      url: `${API_URL}/users/validatePoints`,
      params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// get specific user
// get validate points
export const getSpecificUser = async (params) => {
  const token = getToken();

  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
  try {
    let response = await axios({
      method: 'get',
      url: `${API_URL}/users/specific-user`,
      params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
