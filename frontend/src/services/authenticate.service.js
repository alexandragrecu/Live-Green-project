import axios from 'axios';
import { getToken } from '../helpers/helpers.utils';

// constants
import { API_URL } from './../constants/constants';

export const login = async (params) => {
  try {
    let response = await axios({
      method: 'post',
      url: `${API_URL}/users/login`,
      data: params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const register = async (params) => {
  try {
    let response = await axios({
      method: 'post',
      url: `${API_URL}/users/signup`,
      data: params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const logout = async () => {
  const token = getToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    let response = await axios({
      method: 'get',
      url: `${API_URL}/users/logout`,
      config,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// scan a product
