import React, { Fragment, useEffect, useContext, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// context
import { AppContext } from './context/appContext';

// import components
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

// import screens
import Home from './screens/home/home.screen';
import GetPoints from './screens/getPoints/getPoints.screen';
import Products from './screens/products/products.screen';
import Offers from './screens/offers/offers.screen';
import Articles from './screens/articles/articles.screen';
import AdminPage from './screens/admin/admin.screen';
import Account from './screens/account/account.screen';
import Profile from './screens/profile/profile.screen';
import ProductOptions from './screens/productOptions/productOptions.screen';

// import css files
import './assets/css/style.css';
import './assets/css/animate.css';
import Sticky from 'react-sticky-el';

// calling 'wowjs'
import WOW from 'wowjs';

// import style for sticky navbar
import { affix } from './assets/js/style';
import { getProducts } from './helpers/products.utils';

const App = () => {
  const {
    setScroll,
    setProducts,
    setNrProducts,
    setErrorMessage,
    user,
    token,
    setShowSpinner,
  } = useContext(AppContext);
  // get products
  const getAllProducts = () => {
    setProducts(
      getProducts(
        {},
        setProducts,
        setNrProducts,
        setErrorMessage,
        setShowSpinner
      )
    );
  };

  // refs
  // how-it-works, get-rewards, about-us ref
  const howRef = useRef(null);
  const rewardsRef = useRef(null);
  const aboutRef = useRef(null);

  const executeScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  window.onscroll = function (e) {
    setScroll(true);
  };

  /* eslint-disable */
  useEffect(() => {
    new WOW.WOW({
      animateClass: 'animated',
      offset: 100,
      callback: function (box) {},
    }).init();
  }, []);

  useEffect(() => {
    if (user && token) {
      getAllProducts();
    }
  }, [token]);

  return (
    <Fragment>
      <Router>
        <Sticky stickyStyle={affix}>
          <Header
            executeScroll={executeScroll}
            howRef={howRef}
            rewardsRef={rewardsRef}
            aboutRef={aboutRef}
          />
        </Sticky>

        <Switch>
          <Route path="/get-points">
            <GetPoints />
          </Route>

          <Route path="/products">
            <Products />
          </Route>

          <Route path="/offers">
            <Offers />
          </Route>

          <Route path="/articles">
            <Articles />
          </Route>

          <Route path="/account-settings">
            <Account />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/admin">
            <AdminPage />
          </Route>

          <Route path="/product-options">
            <ProductOptions />
          </Route>

          <Route path="/">
            <Home howRef={howRef} rewardsRef={rewardsRef} aboutRef={aboutRef} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </Fragment>
  );
};

export default App;
