import React from 'react';

import logo from './../../assets/images/logo.png';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-xs-12">
            <a className="logo-area" href="#/">
              {' '}
              <img src={logo} alt="logo Live Green" />{' '}
            </a>
          </div>
          <div className="col-md-1 col-xs-12"></div>
          <div className="col-md-3 col-xs-12">
            <ul>
              <li>
                {' '}
                <a href="#/">Contact us</a>{' '}
              </li>
              <li>
                {' '}
                <a href="#/">About us</a>{' '}
              </li>
              <li>
                {' '}
                <a href="#/">Earn points</a>{' '}
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-xs-12">
            <ul>
              <li>
                {' '}
                <a href="#/">Get awards</a>{' '}
              </li>
              <li>
                {' '}
                <a href="#/">Termeni si conditii</a>{' '}
              </li>
              <li>
                {' '}
                <a href="#/">Lorem ipsum</a>{' '}
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-xs-12">
            <ul className="social-media">
              <li>
                {' '}
                <a href="#/">
                  <i className="fa fa-instagram" aria-hidden="true"></i>{' '}
                </a>{' '}
              </li>
              <li>
                {' '}
                <a href="#/">
                  <i className="fa fa-linkedin" aria-hidden="true"></i>
                </a>{' '}
              </li>
              <li>
                {' '}
                <a href="#/">
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>{' '}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">© 2021 Live Green.</div>
    </footer>
  );
};

export default Footer;
