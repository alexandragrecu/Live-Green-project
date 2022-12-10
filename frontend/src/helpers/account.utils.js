import * as accountService from './../services/account.service';
import * as userOptions from './user.utils';

export const updateData = async (
  e,
  data,
  setUser,
  setShowSpinner,
  setErrorMessage,
  setSuccessMessage
) => {
  e.preventDefault();
  setShowSpinner(true);
  let response = await accountService.updateData(data);

  if (response) {
    if (response.status === 200) {
      await userOptions.getUser(setUser);
      setSuccessMessage('Your account details have been successfully updated.');
    } else {
      setErrorMessage(
        'Your account details could not be updated. Please try again.'
      );
    }
  } else {
    setErrorMessage(
      'Your account details could not be updated. Please try again later.'
    );
  }

  setShowSpinner(false);
};

export const changePassword = async (
  data,
  setShowSpinner,
  setErrorMessage,
  setSuccessMessage,
  setUser,
  setToken
) => {
  let response = await accountService.changePassword(data);
  if (response) {
    if (response.status === 200) {
      setSuccessMessage('Your account details have been successfully updated.');
      setUser(response.data.data.user);
      setToken(response.data.token);
    } else if (response.status === 401 && response.data.status === 'fail') {
      setErrorMessage(`We could not update your password.`);
    } else {
      setErrorMessage('An error occured. Please try again later.');
    }
  }
};
