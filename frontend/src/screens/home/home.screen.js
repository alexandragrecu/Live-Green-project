import React, { Fragment, useContext } from 'react';

import { Link } from 'react-router-dom';

// context
import { AppContext } from './../../context/appContext';

// import components
import Login from './../../components/login/login.component';
import Register from './../../components/register/register.component';
import Arrow from './../../components/arrow/arrow.component';

// import images
import image1 from './../../assets/images/Image_1.png';
import bec from './../../assets/images/bec.png';
import grup1 from './../../assets/images/Group_64.png';
import laptop from './../../assets/images/laptop.png';
import salata1 from './../../assets/images/salata-1.png';
import salata2 from './../../assets/images/salata-2.png';
import metrou from './../../assets/images/metrou.png';

const Home = ({ howRef, rewardsRef, aboutRef }) => {
  const { user, showSpinner } = useContext(AppContext);

  return (
    <Fragment>
      {/* Login and Register components are just some modals that appear when you click their buttons on Homepage, they don't appear anywhere else*/}
      {!user && <Login />}
      {!user && <Register />}

      {/* main section - user is not logged */}
      {!user && (
        <div className="main-content">
          <div className="section-1-homepage">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className="subtitle-section-1-home">
                    It's never hard to be green!
                  </div>
                  <div className="title-section-1-home">
                    <span>Working toward a </span>world without
                    <br /> waste
                  </div>
                  <div className="text-section-1-home">
                    <p>
                      With Live Green, you’ll be able to get rewarded every time
                      you help your community cut down on waste.{' '}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-xs-12">
                  <img style={{ maxWidth: '100%' }} src={image1} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div
            ref={howRef}
            className="section-2-homepage wow fadeInUp"
            data-wow-duration="2s"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-5 col-xs-12">
                  <div className="elements-column">
                    <div className="box-section-general">
                      <img src={bec} alt="" />
                      <h3>How Live Green works</h3>
                      <p>
                        Live Green inspires and rewards smarter, everyday
                        choices for a more sustainable future.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-1 col-xs-12"></div>
                <div className="col-md-6 col-xs-12">
                  <div className="box-text-general">
                    <div className="title-general-home">
                      How Live Green works? <span>Is it hard to recycle?</span>
                    </div>
                    <div className="text-general-home">
                      Live Green helps create a more sustainable future by
                      rewarding people for taking everyday green actions with
                      discounts and deals from local and national businesses.
                      It's really pretty simple: you select a green action you
                      want to be rewarded for and each time we have confirmation
                      that you've done it you can choose a reward.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="section-3-homepage wow fadeInUp"
            data-wow-duration="2s"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className="box-text-general">
                    <div className="title-general-home">
                      How it works? <span></span>
                    </div>
                    <div className="text-general-home">
                      Live Green works by measuring the amount of kerbside dry
                      waste each home recycles and then converting it into
                      points, redeemable in a range of local and national
                      retailers
                    </div>
                  </div>
                </div>
                <div className="col-md-1 col-xs-12"></div>
                <div className="col-md-5 col-xs-12">
                  <div className="elements-column">
                    <div className="box-section-general">
                      <img src={grup1} alt="" />
                      <h3>How it works?</h3>
                      <p>
                        First, you will need to sign up for Live Green. Once you
                        are registered, head over to the Get Points Tab to start
                        earning points!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={rewardsRef}
            className="section-4-homepage wow fadeInUp"
            data-wow-duration="2s"
          >
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <img style={{ maxWidth: '100%' }} src={laptop} alt="" />
                </div>
                <div className="col-md-6 col-xs-12">
                  <div className="box-text-general">
                    <div className="title-general-home">
                      Get rewards <span>, we have a lot of surprises!</span>
                    </div>
                    <div className="text-general-home"></div>
                    <div className="text-general-home">
                      You can earn points from Live Green in a variety of ways.
                      This includes home recycling, using points code on
                      specially marked packages, by learning or reading
                      Articles, referring a friend, or completing a certain
                      online action. These update often so you will need to
                      check in or view your occasional emails from Recyclebank
                      to participate in the new offers.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="section-5-homepage wow fadeInUp"
            data-wow-duration="2s"
          >
            <div ref={aboutRef} className="container">
              <h2>About us</h2>
              <div className="row">
                <div className="col-md-5 col-xs-12">
                  <div className="elements-column">
                    <div className="box-section-general">
                      <img src={bec} alt="" />
                      <h3>Some words about us</h3>
                      <p>
                        We have one question in mind: could education and
                        incentives get people to recycle more?
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-1 col-xs-12"></div>
                <div className="col-md-6 col-xs-12">
                  <div className="box-text-general">
                    <div className="title-general-home">
                      About us <span>Our Mission</span>
                    </div>
                    <div className="text-general-home">
                      Live Green was developed to change the way we think about
                      sustainability and recycling. We believe that personal
                      actions, can and do make a big difference; that people
                      prefer the carrot over the stick when it comes
                      sustainability.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* main section - user is logged */}
      {user && !showSpinner && (
        <div className="main-content">
          <div className="section-1-logged">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className="title-general-home">
                    <span>Hello,</span> {user.firstName}
                    <span>!</span>
                  </div>
                  <div className="text-general-home">
                    <p>
                      Live Green was developed to change the way we think about
                      sustainability and recycling. We believe that personal
                      actions, can and do make a big difference; that people
                      prefer the carrot over the stick when it comes
                      sustainability.
                    </p>
                    <p>
                      Live Green was developed to change the way we think about
                      sustainability and recycling. We believe that personal
                      actions, can and do make a big difference, that people
                      prefer the carrot over the stick when it comes
                      sustainability.
                    </p>
                  </div>
                  <div className="info-section-1-logged">
                    <div className="cta-section">
                      {/* <a href="#/">Scan a product</a> */}
                      <Link to="/get-points">Scan a product</Link>
                    </div>
                    <div className="disclaimer-points">
                      Your total points: {user.totalPoints}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xs-12"></div>
              </div>
            </div>
          </div>
          <div className="section-2-logged wow fadeInUp" data-wow-duration="2s">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className="row">
                    <div className="col-md-6 col-xs-12">
                      <a href="#/">
                        {' '}
                        <img
                          style={{ maxWidth: '100%' }}
                          src={salata1}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <a href="#/">
                        {' '}
                        <img
                          style={{ maxWidth: '100%' }}
                          src={salata2}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xs-12">
                  <div className="box-text-general">
                    <div className="title-general-home">
                      Offer:{' '}
                      <span>reducere restaurant Bucuresti: 300 points</span>
                    </div>
                    <div className="text-general-home">
                      Recycle as many products as possible to reach 300 points
                      and you can receive discounts at restaurants in Bucharest.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-3-logged">
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className="box-text-general">
                    <div className="title-general-home">
                      Offer:{' '}
                      <span>10 calatorii metrou Bucuresti: 100 points</span>
                    </div>
                    <div className="text-general-home">
                      Recycle as many products as possible to reach 100 points
                      and you can receive a card with 10 free subway trips.
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-xs-12">
                  <a href="#/">
                    {' '}
                    <img style={{ maxWidth: '100%' }} src={metrou} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Arrow />
    </Fragment>
  );
};

export default Home;
