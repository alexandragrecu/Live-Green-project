import axios from 'axios';

import { getToken } from '../helpers/helpers.utils';

// constants
import { API_URL } from './../constants/constants';

const setToken = () => {
  const token = getToken();
  axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

// get all offers
export const getOffers = async (params) => {
  setToken();

  try {
    let response = await axios({
      method: 'get',
      url: `${API_URL}/offers`,
      params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// get an offer
export const getOffer = async (id) => {
  setToken();

  try {
    let response = await axios({
      method: 'get',
      url: `${API_URL}/offers/${id}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// get offer by keyword

export const searchOffer = async (params) => {
  try {
    let response = await axios({
      method: 'get',
      url: `${API_URL}/offers/search`,
      params,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
