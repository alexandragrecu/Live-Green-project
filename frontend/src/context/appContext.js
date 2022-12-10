import React, { useMemo, createContext, useState } from 'react';

import { useLocalStorage } from '../hooks/useLocalStorage.hook';

// CONTEXT ===================================
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', false);
  const [token, setToken] = useLocalStorage('token', null);

  // scroll event
  const [scroll, setScroll] = useState(false);

  // login
  // login credentials
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: '',
  });
  // show login & register modal
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // register
  // register credentials
  const [registerCredentials, setRegisterCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    password: '',
  });

  // spinner
  const [showSpinner, setShowSpinner] = useState(false);

  // error message
  const [errorMessage, setErrorMessage] = useState(false);

  // success message
  const [successMessage, setSuccessMessage] = useState(false);

  // products
  const [products, setProducts] = useState([]);
  const [nrProducts, setNrProducts] = useState(0);

  // offers
  const [offers, setOffers] = useState([]);

  // articles
  const [articles, setArticles] = useState([]);

  // center coordinates for map
  const [center, setCenter] = useState([44.4372808, 26.1000002]);

  // users for admin pages
  const [users, setUsers] = useState(false);

  // admin page
  const [modifiedSection, setModifiedSection] = useState({
    users: false,
    products: false,
    offers: false,
  });

  /* eslint-disable */
  const store = {
    loginCredentials,
    setLoginCredentials,
    user,
    setUser,
    showSpinner,
    setShowSpinner,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
    showLoginModal,
    setShowLoginModal,
    registerCredentials,
    setRegisterCredentials,
    showRegisterModal,
    setShowRegisterModal,
    token,
    setToken,
    scroll,
    setScroll,
    products,
    setProducts,
    nrProducts,
    setNrProducts,
    offers,
    setOffers,
    articles,
    setArticles,
    center,
    setCenter,
    users,
    setUsers,
    modifiedSection,
    setModifiedSection,
  };

  const storeForProvider = useMemo(() => store, [store]);
  return (
    <AppContext.Provider value={storeForProvider}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext };
export default AppProvider;
