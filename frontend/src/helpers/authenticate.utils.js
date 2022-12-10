import * as authentication from './../services/authenticate.service';

// login
export const doLogin = async (
  loginCredentials,
  setUser,
  setShowSpinner,
  setErrorMessage,
  setToken,
  history
) => {
  setShowSpinner(true);

  let response = await authentication.login(loginCredentials);
  if (response) {
    if (response.status === 200 && response.data.status === 'success') {
      setUser(response.data.data.user);
      setToken(response.data.token);
      if (response.data.data.user.role === "admin") {
        history.push('/admin');
      }
    } else if (response.status === 401) {
      setErrorMessage('Incorrect email or password.');
    } else if (response.status === 400) {
      setErrorMessage('Please provide email and password.');
    } else {
      setErrorMessage('An error occured, please try again later.');
    }
  }

  setShowSpinner(false);
};

export const doRegister = async (
  registerCredentials,
  setUser,
  setShowSpinner,
  setErrorMessage,
  setToken
) => {
  setShowSpinner(true);

  let response = await authentication.register(registerCredentials);
  if (response) {
    if (response.status === 201 && response.data.status === 'success') {
      setUser(response.data.data.user);
      setToken(response.data.token);
    } else if (response.status === 400 && response.data.status === 'fail') {
      setErrorMessage(response.data.message);
    } else {
      setErrorMessage('An error occured. Please try again later!');
    }
  }

  setShowSpinner(false);
};

export const doLogout = async (
  setShowSpinner,
  setUser,
  setToken,
  setShowLoginModal,
  setShowRegisterModal
) => {
  setShowSpinner(true);
  let response = await authentication.logout();

  if (response) {
    if (response.status === 200 && response.data.status === 'success') {
      setUser(false);
      setToken(undefined);
      setShowLoginModal(false);
      setShowRegisterModal(false);
    }
  }

  // setTimeout(() => {
  setShowSpinner(false);
  // }, 1000);
  window.location.reload();
};
