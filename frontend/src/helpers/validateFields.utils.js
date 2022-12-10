// validate email

export const validateEmail = (email) => {
  // prettier-ignore
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/*
validate password
password must have:
- min 6 characters
- max 50 characters
- must contain al lest 1 letter
- must contain 1 number
- must contain special characters like !@#$%^&*
*/

export const validatePassword = (str) => {
  if (str.length < 6) {
    return 'The password is too short!';
  } else if (str.length > 50) {
    return 'The password is too long!';
  } else if (str.search(/\d/) === -1) {
    return 'The password does not contain any numbers!';
  } else if (str.search(/[A-Z]/) === -1) {
    return 'The password does not contain any upper case characters!';
  } else if (
    // prettier-ignore
    str.search(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) === -1
  ) {
    return 'The password does not contain any special characters';
  }
  return true;
};

export const validateFieldsForLogin = (email, password) => {
  if (
    email.length !== 0 &&
    password.length !== 0 &&
    validateEmail(email) &&
    validatePassword(password) === true
  ) {
    return true;
  }

  return false;
};

// register form

export const passwordsMatch = (password, confirmPassword) => {
  return password.localeCompare(confirmPassword);
};

export const validateFieldsForRegister = (credentials, confirmPassword) => {
  if (
    credentials.firstName.length !== 0 &&
    credentials.lastName.length !== 0 &&
    validateEmail(credentials.email) &&
    credentials.zipCode !== 0 &&
    passwordsMatch(credentials.password, confirmPassword) === 0 &&
    validatePassword(credentials.password)
  ) {
    return true;
  }
  return false;
};

export const validateFieldsForEditAccount = (updatedUser, passwords) => {
  if (
    updatedUser.firstName !== 0 &&
    updatedUser.lastName !== 0 &&
    validateEmail(updatedUser.email) &&
    updatedUser.zipCode !== 0
  ) {
    if (passwords) {
      if (validatePassword(passwords.newPassword) === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  return false;
};

// validate zip code
export const validateZipCode = (zipCode) => {
  console.log('zipCode', zipCode);
  if (/^\d+$/.test(zipCode) && zipCode.length === 6) {
    return true;
  }
  return false;
};
