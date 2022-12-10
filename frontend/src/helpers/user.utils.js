import * as userServices from './../services/user.service';

export const getUser = async (setUser) => {
  let response = await userServices.getUser();
  if (response) {
    if (response.status === 200) {
      setUser(response.data.data);
    }
  }
};

export const getUsers = async (setUsers, setShowSpinner) => {
  setShowSpinner(true);
  let response = await userServices.getUsers();
  if (response) {
    if (response.status === 200) {
      setUsers(response.data.data.users);
    }
  }
  setShowSpinner(false);
};

export const validatePoints = async (e, params, setShowSpinner, setErrorMessage, setSuccessMessage, setUsers) => {
  e.preventDefault();

  setShowSpinner(true);

  let response = await userServices.validatePoints(params);

  if (response) {
    if (response.status === 200) {
      setSuccessMessage(`You have successfully validated points for ${response.data.data.firstName} ${response.data.data.lastName}. `)
      await getUsers(setUsers, setShowSpinner);
    } else {
      setErrorMessage('We could not validate points for this user. Please try again later.')
    }
  } else {
    setErrorMessage('An error occured. Please try again later.')
  }


  setShowSpinner(false);

};

export const getSpecificUser = async (e, params, setShowSpinner, setNoDataMessage, setErrorMessage, setUsers) => {
  e.preventDefault();

  setShowSpinner(true);

  const response = await userServices.getSpecificUser(params);

  if (response) {
    if (response.status === 200) {
      const users = response.data.users;
      if (users.length) {
        setUsers(response.data.users);
      } else {
        setUsers([]);
        setNoDataMessage("There are no users with this credentials.")
      }
    } else if (response.status === 401) {
      setErrorMessage("You are unauthorized to do this action.")
    }
  } else {
    setErrorMessage("An error occured. Please try again later.")
  }


  setShowSpinner(false);
  console.log("response", response);
}
