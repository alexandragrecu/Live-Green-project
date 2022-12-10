import React, { useState, useEffect } from 'react';

// import images
import img from './../../assets/images/salata-png.png';
import happy from './../../assets/images/happy-earth.png';

// import components
import Spinner from './../../components/spinner/spinner.component';
import ErrorMessage from './../../components/errorMessage/errorMessage.component';

// utils functions
import { updatePoints } from '../../helpers/products.utils';

const ProductModal = ({
  showModal,
  product,
  setUser,
  setShowSpinner,
  setErrorMessage,
  errorMessage,
  showSpinner,
}) => {
  const [clickedBtn, setClickedBtn] = useState(false);

  const getParamsToDefault = () => {
    setErrorMessage(false);
    setShowSpinner(false);
  };
  useEffect(() => {
    getParamsToDefault();
  }, []);

  return (
    <div id="myModalProduct" className="productModal">
      <div className="modal-content">
        <div className="modal-body" style={{ height: '500px' }}>
          <span className="closeproduct" onClick={() => showModal(false)}>
            &times;
          </span>
          <div className="wrapper-modal-product">
            <div className="image-single-product-modal">
              {!clickedBtn && !errorMessage && (
                <img
                  src={product.image !== 'none' ? product.image : img}
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '100%',
                  }}
                  alt=""
                />
              )}
              {clickedBtn && !errorMessage && !showSpinner && (
                <img src={happy} alt="" />
              )}
            </div>
            <div className="title-single-product-modal">
              {clickedBtn && !errorMessage
                ? 'You have successfully added this product! Congrats!'
                : product.name}
            </div>
            {showSpinner && <Spinner className="spinner" />}
            {!showSpinner && (
              <div
                className={
                  clickedBtn && !errorMessage
                    ? 'hidden info-product-single'
                    : 'info-product-single'
                }
              >
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
            )}
            {!clickedBtn && !errorMessage && !showSpinner ? (
              <a
                href="#/"
                className="btn-blue"
                onClick={() =>
                  updatePoints(
                    product._id,
                    setShowSpinner,
                    setUser,
                    setErrorMessage,
                    setClickedBtn
                  )
                }
              >
                Add this product
              </a>
            ) : null}
          </div>
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
