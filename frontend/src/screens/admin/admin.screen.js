import React, { useEffect, useState, useContext, Fragment } from 'react';

// import utils
import { getUsers, getSpecificUser } from '../../helpers/user.utils';

// import components
import ValidationModal from './../../components/validationModal/validationModal.component';
import ErrorMessage from './../../components/errorMessage/errorMessage.component';
import SuccessMessage from './../../components/successMessage/successMessage.component';
import Spinner from './../../components/spinner/spinner.component';

// import screens
import ProductOptions from './../productOptions/productOptions.screen';
import OffersOptions from './../offersOptions/offersOptions.screen';

// context
import { AppContext } from './../../context/appContext';

// style for spinner
import { loginStyle } from './../../assets/css/spinner';

const AdminPage = () => {
  const {
    users,
    setUsers,
    showSpinner,
    setShowSpinner,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
    modifiedSection,
    setModifiedSection,
  } = useContext(AppContext);
  const getAllUsers = () => {
    getUsers(setUsers, setShowSpinner);
  };

  const [clickedUser, setClickedUser] = useState(false);

  const handleCancel = () => {
    setClickedUser(false);
  };

  /* eslint-disable */
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleCheck = (user) => {
    setClickedUser(user);
    setErrorMessage(false);
    setSuccessMessage(false);
    setModifiedSection({ users: true, products: false, offers: true });
  };

  const handleSearch = (e) => {
    setUserName(e.target.value);
    setErrorMessage(false);
    setNoDataMessage(false);
  };
  const [userName, setUserName] = useState('');

  const [noDataMessage, setNoDataMessage] = useState(false);

  return (
    <div className="container">
      <div>
        <form className="search-product" action="" method="">
          <input
            type="text"
            name=""
            onChange={(e) => handleSearch(e)}
            placeholder=" Search user..."
          />
          <input
            type="submit"
            name=""
            value=""
            onClick={(e) =>
              getSpecificUser(
                e,
                { name: userName },
                setShowSpinner,
                setNoDataMessage,
                setErrorMessage,
                setUsers
              )
            }
            className="submit-search-product"
          />
        </form>
      </div>
      <p className="subtitle">Users</p>
      <br />
      <div className="container table-wrapper">
        {!showSpinner && successMessage && modifiedSection.users && (
          <SuccessMessage message={successMessage} />
        )}
        {!showSpinner && errorMessage && (
          <ErrorMessage message={errorMessage} />
        )}
        <br />
        <br />
        {showSpinner && (
          <Spinner css={loginStyle} className="backgroundSpinner" />
        )}
        <table
          className="table table-striped table-hover"
          id="reports-table"
          style={{ marginTop: '-20px' }}
        >
          <thead>
            <tr>
              <th>Nr</th>
              <th className="hide-550">Name</th>
              <th className="hide-550">Email</th>
              <th className="hide-550">Role</th>
              <th className="hide-550">Zip Code</th>
              <th className="hide-550">Total Points</th>
              <th className="hide-550">Validate Points</th>
            </tr>
          </thead>
          <tbody>
            {noDataMessage && (
              <div>
                <br />
                {noDataMessage}
              </div>
            )}
            {users &&
              users.map((user, index) => (
                <tr key={user._id}>
                  <td
                    className={
                      user.validatedPoints ? 'validate' : 'no-validate'
                    }
                  >
                    {index + 1}
                  </td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.zipCode}</td>
                  <td
                    className={
                      user.validatedPoints ? 'validate' : 'no-validate'
                    }
                  >
                    {user.totalPoints}
                  </td>
                  <td
                    onClick={() => handleCheck(user)}
                    className={
                      user.validatedPoints ? 'validate' : 'no-validate'
                    }
                  >
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {clickedUser && !successMessage && !errorMessage && (
        <ValidationModal
          firstName={clickedUser.firstName}
          lastName={clickedUser.lastName}
          points={clickedUser.totalPoints}
          handleCancel={handleCancel}
          validate={clickedUser.validatedPoints}
          id={clickedUser._id}
        />
      )}
      <br />
      <br />
      <br />
      <ProductOptions />
      <OffersOptions />
    </div>
  );
};

export default AdminPage;
