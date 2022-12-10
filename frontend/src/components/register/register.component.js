import React, { useState, useContext, Fragment } from 'react';

// context
import { AppContext } from './../../context/appContext';

// components
import Input from './../input/input.component';
import ErrorMessage from './../errorMessage/errorMessage.component';
import Button from './../button/button.component';
import Spinner from './../spinner/spinner.component';

// style for spinner
import { loginStyle } from './../../assets/css/spinner';

// util functions
import {
  passwordsMatch,
  validateEmail,
  validateFieldsForRegister,
  validatePassword,
  validateZipCode,
} from '../../helpers/validateFields.utils';
import { doRegister } from '../../helpers/authenticate.utils';

const Register = () => {
  const {
    registerCredentials,
    setRegisterCredentials,
    setUser,
    setShowSpinner,
    setErrorMessage,
    showSpinner,
    user,
    showRegisterModal,
    setShowRegisterModal,
    errorMessage,
    setToken,
  } = useContext(AppContext);

  const [confirmPassword, setConfirmPassword] = useState('');

  const [typing, setTyping] = useState({
    firstName: false,
    lastName: false,
    email: false,
    zipCode: false,
    password: false,
    repeatPassword: false,
    registerButton: false,
  });

  const isTyping = (key, value) => {
    const typingAux = { ...typing };
    typingAux[key] = value;
    typingAux['button'] = false;
    setTyping(typingAux);
  };

  // function called for updating register credentials
  const getRegisterCredentials = (key, value) => {
    const registerCredentialsAux = { ...registerCredentials };
    registerCredentialsAux[key] = value;
    setRegisterCredentials(registerCredentialsAux);
    // setErrorMessage(false);
    setTyping({ ...typing, registerButton: false });
    setErrorMessage(false);
  };

  const submitRegister = (e) => {
    e.preventDefault();
    setTyping({ ...typing, registerButton: true });

    if (validateFieldsForRegister(registerCredentials, confirmPassword)) {
      doRegister(
        registerCredentials,
        setUser,
        setShowSpinner,
        setErrorMessage,
        setToken
      );
    }
  };

  return (
    <Fragment>
      {showSpinner ? (
        <Spinner css={loginStyle} className="backgroundSpinner" />
      ) : null}
      {!showSpinner && !user && showRegisterModal && (
        <div id="myModalregister" className="modalLogin">
          <div className="modal-content">
            <div className="modal-body">
              <span
                className="closeregister"
                onClick={() => setShowRegisterModal(false)}
              >
                &times;
              </span>
              <form className="" action="" method="">
                <div className="form-group">
                  <Input
                    type="text"
                    name="fname"
                    value={
                      registerCredentials.firstName
                        ? registerCredentials.firstName
                        : ''
                    }
                    placeholder="First Name:"
                    onFocus={() => isTyping('firstName', true)}
                    onBlur={() => isTyping('firstName', false)}
                    onChange={(e) =>
                      getRegisterCredentials('firstName', e.target.value)
                    }
                  />
                  {typing['registerButton'] &&
                    registerCredentials.firstName.length === 0 && (
                      <ErrorMessage message="Please enter your first name!" />
                    )}
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    name="lname"
                    value={
                      registerCredentials.lastName
                        ? registerCredentials.lastName
                        : ''
                    }
                    placeholder="Last Name:"
                    onFocus={() => isTyping('lastName', true)}
                    onBlur={() => isTyping('lastName', false)}
                    onChange={(e) =>
                      getRegisterCredentials('lastName', e.target.value)
                    }
                  />
                  {typing['registerButton'] &&
                    registerCredentials.lastName.length === 0 && (
                      <ErrorMessage message="Please enter your last name!" />
                    )}
                </div>
                <div className="form-group">
                  <Input
                    type="email"
                    name="email"
                    value={
                      registerCredentials.email ? registerCredentials.email : ''
                    }
                    placeholder="Your email address:"
                    onFocus={() => isTyping('email', true)}
                    onBlur={() => isTyping('email', false)}
                    onChange={(e) =>
                      getRegisterCredentials('email', e.target.value)
                    }
                  />
                  {registerCredentials.email.length !== 0 &&
                    !typing['email'] &&
                    !validateEmail(registerCredentials.email) && (
                      <ErrorMessage message="Please enter a valid email address!" />
                    )}
                  {typing['registerButton'] &&
                    registerCredentials.email.length === 0 && (
                      <ErrorMessage message="Please enter your email!" />
                    )}
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    name="zipcode"
                    value={
                      registerCredentials.zipCode
                        ? registerCredentials.zipCode
                        : ''
                    }
                    placeholder="ZIP code:"
                    onFocus={() => isTyping('zipCode', true)}
                    onBlur={() => isTyping('zipCode', false)}
                    onChange={(e) =>
                      getRegisterCredentials('zipCode', e.target.value)
                    }
                  />
                  {typing['registerButton'] &&
                    registerCredentials.zipCode.length === 0 && (
                      <ErrorMessage message="Please enter your ZIP code!" />
                    )}
                  {console.log('Zip code typing', typing['zipCode'])}
                  {!typing['zipCode'] &&
                    registerCredentials.zipCode.length !== 0 &&
                    !validateZipCode(registerCredentials.zipCode) && (
                      <ErrorMessage message="Please enter a valid ZIP Code!" />
                    )}
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    name="password"
                    value={
                      registerCredentials.password
                        ? registerCredentials.password
                        : ''
                    }
                    placeholder="Your password:"
                    onFocus={() => isTyping('password', true)}
                    onBlur={() => isTyping('password', false)}
                    onChange={(e) =>
                      getRegisterCredentials('password', e.target.value)
                    }
                  />
                  {registerCredentials.password.length !== 0 &&
                    !typing['password'] &&
                    validatePassword(registerCredentials.password) !== true && (
                      <ErrorMessage message="Please enter a valid password. It must contain at least 6 characters, 1 upper case, 1 number and 1 special character!" />
                    )}
                  {typing['password'] && (
                    <div className="formInfo">
                      It must contain at least 6 characters, 1 upper case
                      character, 1 number and 1 special character!"
                    </div>
                  )}
                  {typing['registerButton'] &&
                    registerCredentials.password.length === 0 && (
                      <ErrorMessage message="Please enter your password!" />
                    )}
                </div>
                <div className="form-group">
                  <Input
                    type="password"
                    name="repeatpassword"
                    value={confirmPassword}
                    placeholder="Re-enter password:"
                    onFocus={() => isTyping('confirmPassword', true)}
                    onBlur={() => isTyping('confirmPassword', false)}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {confirmPassword.length !== 0 &&
                    !typing['confirmPassword'] &&
                    passwordsMatch(
                      registerCredentials.password,
                      confirmPassword
                    ) !== 0 && (
                      <ErrorMessage message="Passwords don't match!" />
                    )}

                  {typing['registerButton'] &&
                    registerCredentials.password.length === 0 && (
                      <ErrorMessage message="Please enter your password!" />
                    )}
                </div>
                <div className="form-group">
                  <Button
                    className="btn-green-gradient"
                    name="Register"
                    onClick={(e) => submitRegister(e)}
                  />
                  <br />
                  <br />
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

export default Register;
