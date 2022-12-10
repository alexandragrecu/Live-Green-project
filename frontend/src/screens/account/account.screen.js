import React, { useContext, useState, useEffect } from 'react';

// context
import { AppContext } from './../../context/appContext';

// utils functions
import { updateData, changePassword } from './../../helpers/account.utils';

import {
  validateEmail,
  validateFieldsForEditAccount,
  validatePassword,
} from '../../helpers/validateFields.utils';

// import components
import Spinner from './../../components/spinner/spinner.component';
import ErrorMessage from '../../components/errorMessage/errorMessage.component';
import SuccessMessage from '../../components/successMessage/successMessage.component';

// style for spinner
import { loginStyle } from './../../assets/css/spinner';

const style = { textAlign: 'start', marginTop: '-10px' };

const Account = () => {
  const {
    user,
    setUser,
    showSpinner,
    setShowSpinner,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    setToken,
  } = useContext(AppContext);

  const [updatedUser, setUpdatedUser] = useState(user);

  const handleCancel = () => {
    setUpdatedUser(user);
  };

  const [passwords, setPasswords] = useState(false);
  const [clickedEditBtn, setClickedBtn] = useState(false);

  const [typing, setTyping] = useState({
    firstName: false,
    lastName: false,
    email: false,
    zipCode: false,
    newPassword: false,
  });

  const isTyping = (key, value) => {
    const typingAux = { ...typing };
    typingAux[key] = value;
    setTyping(typingAux);

    setErrorMessage(false);
    setSuccessMessage(false);
    setError(false);
  };

  // for errors due to validation requirements.
  const [error, setError] = useState(false);

  const handleEditAccount = (e) => {
    e.preventDefault();
    setErrorMessage(false);
    setSuccessMessage(false);
    if (validateFieldsForEditAccount(updatedUser, passwords)) {
      updateData(
        e,
        updatedUser,
        setUser,
        setShowSpinner,
        setErrorMessage,
        setSuccessMessage
      );
      if (passwords) {
        changePassword(
          passwords,
          setShowSpinner,
          setErrorMessage,
          setSuccessMessage,
          setUser,
          setToken
        );
      }
    } else {
      setError('Please complete all the fields correctly.');
    }
    setClickedBtn(true);
  };

  const getUser = (userInfo) => {
    setUpdatedUser(userInfo);
    setClickedBtn(false);
  };

  useEffect(() => {
    if (user) {
      getUser(user);
    }
  }, [user]);

  return (
    <div className="main-content">
      {clickedEditBtn && showSpinner && (
        <Spinner css={loginStyle} className="backgroundSpinner" />
      )}
      <div className="section-1-settings">
        <div className="container">
          <div className="row">
            <div className="wrapper-form">
              <div className="content-form">
                <h3>Editeaza Profilul</h3>
                <form className="" action="" method="">
                  <div className="form-group">
                    <label htmlFor="fname">First name</label>
                    <input
                      id="fname"
                      type="text"
                      name="fname"
                      onFocus={() => isTyping('firstName', true)}
                      onBlur={() => isTyping('firstName', false)}
                      value={updatedUser.firstName}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  {!typing['firstName'] && !updatedUser.firstName.length && (
                    <ErrorMessage
                      message="First name field can't be empty"
                      style={style}
                    />
                  )}
                  <div className="form-group">
                    <label htmlFor="lname">Last name</label>
                    <input
                      id="lname"
                      type="text"
                      name="lname"
                      onFocus={() => isTyping('lastName', true)}
                      onBlur={() => isTyping('lastName', false)}
                      value={updatedUser.lastName}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  {!typing['lastName'] && !updatedUser.lastName.length && (
                    <ErrorMessage
                      message="Last name field can't be empty"
                      style={style}
                    />
                  )}
                  <div className="form-group">
                    <label htmlFor="email">Your email address:</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      onFocus={() => isTyping('email', true)}
                      onBlur={() => isTyping('email', false)}
                      value={updatedUser.email}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  {updatedUser.email.length !== 0 &&
                    !typing['email'] &&
                    !validateEmail(updatedUser.email) && (
                      <ErrorMessage
                        message="Please enter a valid email address!"
                        style={style}
                      />
                    )}
                  <div className="form-group">
                    <label htmlFor="zipcode">ZIP code:</label>
                    <input
                      id="zipcode"
                      type="text"
                      name="zipcode"
                      value={updatedUser.zipCode}
                      onChange={(e) =>
                        setUpdatedUser({
                          ...updatedUser,
                          zipCode: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Old password:</label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      onChange={(e) => {
                        setPasswords({
                          ...passwords,
                          oldPassword: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newpassword">New password:</label>
                    <input
                      id="newpassword"
                      type="password"
                      name="newpassword"
                      onFocus={() => isTyping('password', true)}
                      onBlur={() => isTyping('password', false)}
                      onChange={(e) => {
                        setPasswords({
                          ...passwords,
                          newPassword: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {passwords.newPassword &&
                    passwords.newPassword.length !== 0 &&
                    !typing['password'] &&
                    validatePassword(passwords.newPassword) !== true && (
                      <ErrorMessage
                        message="Please enter a valid password. It must contain at least 6 characters, 1 upper case, 1 number and 1 special character!"
                        style={style}
                      />
                    )}
                  {typing['password'] && (
                    <div className="formInfo" style={style}>
                      It must contain at least 6 characters, 1 upper case
                      character, 1 number and 1 special character!"
                    </div>
                  )}
                  <br />
                  <div className="row">
                    <div className="col-md-6 col-xs-12">
                      <input
                        className="btn-green-gradient"
                        type="submit"
                        name=""
                        value="Edit Account"
                        onClick={(e) => handleEditAccount(e)}
                      />
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <button
                        className="btn-green-gradient"
                        type="button"
                        name="button"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
                <br />
                {error && <ErrorMessage message={error} />}
                {errorMessage ? (
                  <ErrorMessage message={errorMessage} />
                ) : (
                  <SuccessMessage message={successMessage} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
