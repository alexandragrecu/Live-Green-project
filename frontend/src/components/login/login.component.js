import React, { Fragment, useState, useContext } from 'react';

// context
import { AppContext } from './../../context/appContext';

// history for redirecting to admin page
import { useHistory } from 'react-router-dom';

// components
import Input from './../input/input.component';
import ErrorMessage from './../errorMessage/errorMessage.component';
import Button from './../button/button.component';
import Spinner from './../spinner/spinner.component';

// style for spinner
import { loginStyle } from './../../assets/css/spinner';

// helpers
import {
  validatePassword,
  validateEmail,
  validateFieldsForLogin,
} from '../../helpers/validateFields.utils';

import { doLogin } from '../../helpers/authenticate.utils';

const Login = () => {
  // get data from context
  const {
    loginCredentials,
    setLoginCredentials,
    user,
    setUser,
    showSpinner,
    setShowSpinner,
    errorMessage,
    setErrorMessage,
    showLoginModal,
    setShowLoginModal,
    setToken,
  } = useContext(AppContext);

  const [typing, setTyping] = useState({
    email: false,
    password: false,
    button: false,
  });

  // checking if user enters loginCredentials (this function is called for onFocus and onBlur events of inputs)
  const isTyping = (key, value) => {
    const typingAux = { ...typing };
    typingAux[key] = value;
    typingAux['button'] = false;
    setTyping(typingAux);
  };

  // function called for updating loginCredentials
  const getLoginCredentials = (key, value) => {
    const LoginCredentialsAux = { ...loginCredentials };
    LoginCredentialsAux[key] = value;
    setLoginCredentials(LoginCredentialsAux);
    setErrorMessage(false);
  };

   const history = useHistory();

  // function called when user whats to submit the login form
  const submitLogin = async (e) => {
    e.preventDefault();
    setTyping({ ...typing, button: true });

    if (
      validateFieldsForLogin(loginCredentials.email, loginCredentials.password)
    ) {
      await doLogin(
        loginCredentials,
        setUser,
        setShowSpinner,
        setErrorMessage,
        setToken,
        history
      );
    console.log("user after login", user);
    }
  };

  return (
    <Fragment>
      {showSpinner ? (
        <Spinner css={loginStyle} className="backgroundSpinner" />
      ) : null}
      {!showSpinner && !user && showLoginModal && (
        <div id="myModallogin" className="modalLogin">
          <div className="modal-content">
            <div className="modal-body">
              <span className="close" onClick={() => setShowLoginModal(false)}>
                &times;
              </span>
              <form className="" action="" method="">
                <div className="form-group">
                  <Input
                    type="email"
                    name="email"
                    value={
                      loginCredentials.email.length
                        ? loginCredentials.email
                        : ''
                    }
                    placeholder="Your email address:"
                    onFocus={() => isTyping('email', true)}
                    onBlur={() => isTyping('email', false)}
                    onChange={(e) =>
                      getLoginCredentials('email', e.target.value)
                    }
                  />
                  {loginCredentials.email.length !== 0 &&
                    !typing['email'] &&
                    !validateEmail(loginCredentials.email) && (
                      <ErrorMessage message="Please enter a valid email address!" />
                    )}
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    name="password"
                    value={
                      loginCredentials.password.length
                        ? loginCredentials.password
                        : ''
                    }
                    placeholder="Password:"
                    onFocus={() => isTyping('password', true)}
                    onBlur={() => isTyping('password', false)}
                    onChange={(e) =>
                      getLoginCredentials('password', e.target.value)
                    }
                  />
                  {loginCredentials.password.length !== 0 &&
                    !typing['password'] &&
                    validatePassword(loginCredentials.password) !== true && (
                      <ErrorMessage message="Please enter a valid password. It must contain at least 6 characters, 1 upper case, 1 number and 1 special character!" />
                    )}
                  {typing['password'] && (
                    <div className="formInfo">
                      It must contain at least 6 characters, 1 upper case
                      character, 1 number and 1 special character!"
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <Button
                    className="btn-green-gradient"
                    // type="submit"
                    name="Login"
                    onClick={(e) => submitLogin(e)}
                  />
                  <br />
                  <br />
                  {typing['button'] &&
                    !validateFieldsForLogin(
                      loginCredentials.email,
                      loginCredentials.password
                    ) && (
                      <ErrorMessage message="Please complete all fields correctly." />
                    )}
                  {errorMessage && errorMessage.length && (
                    <ErrorMessage message={errorMessage} />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
