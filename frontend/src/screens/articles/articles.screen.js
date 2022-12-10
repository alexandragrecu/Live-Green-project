import React, { useContext, useEffect, useState } from 'react';

// import images
import img from './../../assets/images/salata-png.png';
import earth from './../../assets/images/earth.png';

// import components
import Spinner from './../../components/spinner/spinner.component';
import ErrorMessage from '../../components/errorMessage/errorMessage.component';

// context
import { AppContext } from './../../context/appContext';
import { getArticles } from '../../helpers/articles.utils';

const Articles = () => {
  const {
    articles,
    setArticles,
    setShowSpinner,
    showSpinner,
    setErrorMessage,
    errorMessage,
  } = useContext(AppContext);

  const [nrDisplayed, setNrDisplayed] = useState(3);
  const [displayLoadMoreBtn, setDisplayLoadMoreBtn] = useState(true);

  const handleLoadMoreBtn = () => {
    if (articles.length) {
      const nr = nrDisplayed + 3;
      if (nr >= articles.length) {
        setDisplayLoadMoreBtn(false);
      }

      setNrDisplayed(nr);
    }
  };

  const getAllArticles = () => {
    getArticles(setShowSpinner, setArticles, setErrorMessage);
    setDisplayLoadMoreBtn(true);
    setNrDisplayed(3);
    setErrorMessage(false);
  };

  /* eslint-disable */
  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <div className="main-content">
      <div className="section-1-articole">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <div className="title-general-home">
                Articole despre reciclare
              </div>
            </div>
            <div className="col-md-6 col-xs-12">
              <img style={{ maxWidth: '100%' }} src={earth} alt="earth" />
            </div>
          </div>
        </div>
      </div>
      {!showSpinner ? (
        <div
          className="listing-articole listing-offers wow fadeInUp"
          data-wow-duration="2s"
        >
          <div className="container">
            <div className="row">
              {articles &&
                articles.slice(0, nrDisplayed).map((article) => (
                  <div
                    data-wow-duration="2s"
                    key={article._id}
                    className="articol-1 articol-general wow
                    fadeInUp"
                  >
                    <div className="col-md-6 col-xs-12">
                      <img src={article.image} alt="" />
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <div className="title-general-home">
                        {article.title.split(' ')[0]}{' '}
                        <span>
                          {article.title.split(' ').slice(1).join(' ')}
                        </span>
                      </div>
                      <div className="text-general-home">
                        <p>{article.description}</p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin egestas accumsan odio, cursus laoreet
                          mauris porttitor non. Aliquam eu neque nibh. Aenean
                          non pellentesque justo.
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Proin egestas accumsan odio, cursus laoreet
                          mauris porttitor non. Aliquam eu neque nibh. Aenean
                          non pellentesque justo.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

              {displayLoadMoreBtn && !errorMessage && (
                <a href="#/" id="seeMore" onClick={handleLoadMoreBtn}>
                  Load More
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Articles;
