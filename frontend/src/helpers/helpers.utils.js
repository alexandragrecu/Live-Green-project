export const getToken = () => {
  let token = window.localStorage.getItem('token');
  if (token !== null || token !== undefined) {
    token = token.replace(/"/gi, '');
  }
  return token;
};

export const getSort = (field, order) => {
  const params = {};
  if (field === 'points') {
    if (order === 'asc') {
      params['sort'] = 'points';
    } else {
      params['sort'] = '-points';
    }
  }
  if (field === 'weight') {
    if (order === 'asc') {
      params['sort'] = 'weight';
    } else {
      params['sort'] = '-weight';
    }
  }

  return params;
};
