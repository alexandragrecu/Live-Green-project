import React, { useState, useContext, useEffect, Fragment } from 'react';

// context
import { AppContext } from './../../context/appContext';

// images
import img from './../../assets/images/salata-png.png';

// import components
import ProductModal from '../../components/productModal/productModal.component.';
import Spinner from '../../components/spinner/spinner.component';

import { searchProduct, getProducts } from '../../helpers/products.utils';
import { getSort } from '../../helpers/helpers.utils';

const Products = () => {
  const {
    setProducts,
    products,
    nrProducts,
    setNrProducts,
    user,
    setUser,
    showSpinner,
    setShowSpinner,
    errorMessage,
    setErrorMessage,
  } = useContext(AppContext);

  // nr of products for display
  const [nrProd, setNrProd] = useState(3);
  // for displaying "load more products" button
  const [displayBtn, setDisplayBtn] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [productClicked, setProductClicked] = useState({});

  const handleClick = (product) => {
    setShowModal(true);
    setProductClicked(product);
  };

  const handleLoadMore = () => {
    const nr = nrProd + 3;
    if (nr <= products.length) {
      setNrProd(nr);
    } else {
      setNrProd(products.length);
      setDisplayBtn(false);
    }
  };

  const [productName, setProductName] = useState('');

  const searchProductAfterName = (e) => {
    e.preventDefault();
    searchProduct(
      { name: productName },
      setProducts,
      setShowSpinner,
      setErrorMessage,
      setNrProducts
    );
  };

  const sort = (field, order) => {
    const params = getSort(field, order);
    setProducts(
      getProducts(
        params,
        setProducts,
        setNrProducts,
        setErrorMessage,
        setShowSpinner
      )
    );
  };

  /* eslint-disable */
  useEffect(() => {
    if (products) {
      if (nrProd >= products.length) {
        setDisplayBtn(false);
      } else {
        setDisplayBtn(true);
      }
    }
  }, [products]);

  return (
    <Fragment>
      <div className="main-content">
        <div className="section-1-products">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="beforetitle-general-home">
                  Search products and get points!
                </div>
                <div className="title-general-home">Products</div>
                <div className="text-general-home">
                  If you could not scan the product or the product does not have
                  a barcode, you can search for it here and add points.
                </div>
              </div>
              <div className="col-md-6 col-xs-12"></div>
            </div>
          </div>
        </div>
        <div className="section-2-products wow fadeInUp" data-wow-duration="2s">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-xs-12">
                <div className="wrapper-section-1-offers">
                  <div className="disclaimer-points">
                    Your total points: {user.totalPoints}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xs-12">
                <form className="search-product" action="" method="">
                  <input
                    type="text"
                    placeholder=" Search a product..."
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <input
                    type="submit"
                    name=""
                    className="submit-search-product"
                    onClick={(e) => searchProductAfterName(e)}
                  />
                </form>
                <form className="filter-product" action="" method="">
                  <label>Sort products</label>
                  <input
                    type="text"
                    name="points"
                    placeholder="Points"
                    disabled="disabled"
                  />
                  <span className="sort">
                    <i
                      className="fa fa-arrow-up first-arrow"
                      aria-hidden="true"
                      onClick={() => sort('points', 'asc')}
                    ></i>

                    <i
                      className="fa fa-arrow-down"
                      onClick={() => sort('points', 'desc')}
                      aria-hidden="true"
                    ></i>
                  </span>

                  <input
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    disabled="disabled"
                  />
                  <input
                    type="submit"
                    name=""
                    value=""
                    className="submit-filter-product"
                  />
                  <span className="sort">
                    <i
                      className="fa fa-arrow-up first-arrow"
                      aria-hidden="true"
                      onClick={() => sort('weight', 'asc')}
                    ></i>

                    <i
                      className="fa fa-arrow-down"
                      aria-hidden="true"
                      onClick={() => sort('weight', 'desc')}
                    ></i>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="section-3-products wow fadeInUp" data-wow-duration="2s">
          <div className="container">
            <div className="row">
              <br />
              <br />
              <div className="listing-products-page">
                {products.length &&
                  products.slice(0, nrProd).map((product) => (
                    <div key={product._id} className="col-md-4 col-xs-12">
                      <div className="box-single-product">
                        <img
                          src={product.image === 'none' ? img : product.image}
                          style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '100%',
                          }}
                          alt=""
                        />
                        <h4 style={{ marginTop: '40px' }}>{product.name}</h4>
                        <div className="info-product-single">
                          <div className="row">
                            <div className="col-md-6 col-xs-6">
                              <strong className="number-info-points-single">
                                {product.points}
                              </strong>
                              <p>Points</p>
                            </div>
                            <div className="col-md-6 col-xs-6">
                              <strong className="gramaj">
                                {' '}
                                <span>{product.weight}</span> g
                              </strong>
                              <p>Weight</p>
                            </div>
                          </div>
                        </div>

                        <div className="cta-to-product">
                          <a href="#/" onClick={() => handleClick(product)}>
                            <i
                              className="fa fa-arrow-right"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </div>
                      </div>
                      {/* <br /> */}
                      {/* <br /> */}
                    </div>
                  ))}
              </div>
            </div>
            {displayBtn && nrProducts && !showSpinner && (
              <a href="#/" onClick={handleLoadMore} id="seeMoreProducts">
                Load More Products
              </a>
            )}
          </div>

          {showSpinner && !showModal && <Spinner className="spinner2" />}
        </div>
      </div>
      {showModal && (
        <ProductModal
          showModal={setShowModal}
          product={productClicked}
          setUser={setUser}
          setShowSpinner={setShowSpinner}
          setErrorMessage={setErrorMessage}
          showSpinner={showSpinner}
          errorMessage={errorMessage}
        />
      )}
    </Fragment>
  );
};

export default Products;
