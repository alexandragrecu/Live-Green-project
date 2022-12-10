import React, { useContext, useEffect, useState, Fragment } from 'react';

// context
import { AppContext } from './../../context/appContext';

// import components
import Spinner from './../../components/spinner/spinner.component';
import OfferModal from './../../components/offerModal/offerModal.component';
import ErrorMessage from '../../components/errorMessage/errorMessage.component';

// images
import img from './../../assets/images/reward.png';

// style for spinner
import { loginStyle } from './../../assets/css/spinner';

// utils functions
import { getOffers, searchOffer } from '../../helpers/offers.utils';
import { getUser } from './../../helpers/user.utils';

const Offers = () => {
  const {
    offers,
    setOffers,
    showSpinner,
    setShowSpinner,
    user,
    setErrorMessage,
    errorMessage,
    setUser,
  } = useContext(AppContext);

  const getCurrentUser = () => {
    getUser(setUser, setShowSpinner);
  };
  /* eslint-disable */
  useEffect(() => {
    getOffers(setShowSpinner, setOffers, setErrorMessage, {}, false);
    getCurrentUser();
  }, []);

  // load more button functionality
  const [nrOffersDisplayed, setNrOffersDisplayed] = useState(3);
  const [displayLoadMoreBtn, setDisplayLoadMoreBtn] = useState(true);

  // for opening offer modal
  const [clickedOffer, setClickedOffer] = useState(false);

  const handleLoadMoreBtn = () => {
    const nr = nrOffersDisplayed + 3;
    if (nr >= offers.length) {
      setDisplayLoadMoreBtn(false);
    }

    setNrOffersDisplayed(nr);
  };

  const isAvailableOffer = (pointOffer) => {
    if (user.totalPoints - pointOffer >= 0) {
      return true;
    }
    return false;
  };

  // for searching products
  const [keyword, setKeyword] = useState(false);

  // filter offers
  const [filterObj, setFilterObj] = useState({});

  useEffect(() => {
    if (offers) {
      setNrOffersDisplayed(3);
      setDisplayLoadMoreBtn(true);
    }
  }, [offers]);

  return (
    <Fragment>
      <div className="main-content">
        <div className="section-1-offers">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="title-general-home">Offers</div>
                <div className="text-general-home">
                  Choose an offer from your city! You can choose from a variety
                  of offers, for example bus tickets, subway tickets, discounts
                  at certain local businesses, restaurants discounts, books and
                  environmentally friendly items. Don't forget that you can
                  choose an offer only after you have been to the recycling
                  center and your points have been validated.
                </div>
                <br />
                <br />
                {user.validatedPoints ? (
                  <div className="text-general-home successMessage">
                    Congratulations! Your points are validated. Now you can
                    choose any offer within the limits of the points you have.
                    After you choose an offer you will receive an email with all
                    the information about it.
                  </div>
                ) : (
                  <div className="text-general-home formHelp">
                    Note that your points have not been validated yet, so you
                    can't get any offer. You need to go to the nearest recycling
                    center with all the products you scanned or add and then a
                    Live Green representative will validate your points. When
                    your points are validated you will receive an email.
                  </div>
                )}
                <div className="cta-scan">
                  <a className="btn-blue" href="/get-points">
                    Scan a product
                  </a>
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <div className="wrapper-section-1-offers">
                  <div className="disclaimer-points">
                    Your total points: {user.totalPoints}
                  </div>
                </div>
              </div>

              <div
                className="col-md-6 col-xs-12"
                style={{ marginTop: '100px' }}
              >
                <form className="search-product" action="" method="">
                  <input
                    type="text"
                    name="search-offer"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder=" Search an offer..."
                  />
                  <input
                    type="submit"
                    name=""
                    value=""
                    onClick={(e) =>
                      searchOffer(
                        e,
                        keyword,
                        setOffers,
                        setShowSpinner,
                        setErrorMessage
                      )
                    }
                    className="submit-search-product"
                  />
                </form>
                <form className="filter-product" action="" method="">
                  <label>Filter offers</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City:"
                    onChange={(e) =>
                      setFilterObj({ ...filterObj, city: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    name="points"
                    placeholder="Points:"
                    onChange={(e) =>
                      setFilterObj({ ...filterObj, points: e.target.value })
                    }
                  />
                  <input
                    type="submit"
                    name=""
                    onClick={(e) =>
                      getOffers(
                        setShowSpinner,
                        setOffers,
                        setErrorMessage,
                        filterObj,
                        e
                      )
                    }
                    className="submit-filter-product"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="listing-offers wow fadeInUp" data-wow-duration="2s">
          <div className="container">
            <div className="row">
              {offers &&
                offers.slice(0, nrOffersDisplayed).map((offer) => (
                  <div key={offer._id} className="offer-1 offer-general">
                    <div className="col-md-6 col-xs-12">
                      <div className="box-single-offer">
                        <img
                          src={offer.image ? offer.image : img}
                          style={{
                            width: '200px',
                            height: '200px',
                            marginBottom: '10px',
                            borderRadius: '100%',
                          }}
                          alt=""
                        />
                        <h4>{offer.name}</h4>
                        <div className="info-offer-single">
                          <div className="row">
                            <div className="col-md-6 col-xs-6">
                              <strong className="number-info-points-single">
                                {offer.points}
                              </strong>
                              <p>points</p>
                            </div>
                            <div className="col-md-6 col-xs-6">
                              <strong className="gramaj">
                                {' '}
                                <span
                                  className={
                                    isAvailableOffer(offer.points)
                                      ? 'successMessage'
                                      : 'formHelp'
                                  }
                                >
                                  {user.validatedPoints
                                    ? isAvailableOffer(offer.points)
                                      ? 'You can get this offer!'
                                      : 'You cannot get this offer!'
                                    : null}
                                </span>
                              </strong>
                            </div>
                          </div>
                        </div>
                        <div className="cta-to-product">
                          <a
                            href="#/"
                            onClick={
                              isAvailableOffer(offer.points) &&
                              user.validatedPoints
                                ? () => setClickedOffer(offer)
                                : (e) => e.preventDefault()
                            }
                          >
                            <i
                              className="fa fa-arrow-right"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <div className="title-general-home">
                        Here is an <span>offer</span>
                      </div>
                      <div className="text-general-home">
                        Details: {offer.description}
                      </div>
                    </div>
                  </div>
                ))}
              {showSpinner && (
                <Spinner css={loginStyle} className="backgroundSpinner" />
              )}
              {!offers.length && errorMessage && !showSpinner && (
                <ErrorMessage message={errorMessage} />
              )}

              {displayLoadMoreBtn && !errorMessage && (
                <a href="#/" id="seeMore" onClick={handleLoadMoreBtn}>
                  Load More
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      {clickedOffer && (
        <OfferModal offer={clickedOffer} setClickedOffer={setClickedOffer} />
      )}
    </Fragment>
  );
};

export default Offers;
