/* 
https://github.com/dashboardphilippines/react-webcam-barcode-scanner#readme

React component built in Typescript to provide a webcam-based barcode scanner using react-webcam and @zxing/library. This component works on Computers and Mobile Devices (iOS 11 and above and Android Phones)

*/

import React, { useContext, useState, useEffect } from 'react';

// bar-code-scanner
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';

// utils functions
import { scanProduct, updatePoints } from '../../helpers/products.utils';

// components
import Spinner from './../../components/spinner/spinner.component';
import ErrorMessage from './../../components/errorMessage/errorMessage.component';
// context
import { AppContext } from './../../context/appContext';

const GetPoints = () => {
  const {
    user,
    setUser,
    showSpinner,
    setShowSpinner,
    errorMessage,
    setErrorMessage,
  } = useContext(AppContext);

  const [barCode, setBarCode] = useState(false);
  const [barCodeNumber, setBarCodeNumber] = useState(false);
  const [product, setProduct] = useState(false);

  console.log('product', product);
  console.log('barCodeNumber', barCodeNumber);

  const [clickedBtn, setClickedBtn] = useState(false);
  const searchProduct = (number) => {
    console.log('number', number);
    console.log('barCodeNumber', barCodeNumber);
    if (number.localeCompare(barCodeNumber) !== 0) {
      setBarCodeNumber(number);
      // setProduct(false);
      setErrorMessage(false);
      scanProduct(number, setShowSpinner, setProduct, setErrorMessage);
    }
  };

  /* eslint-disable */

  const getParamsToDefault = () => {
    setErrorMessage(false);
    setClickedBtn(false);
  };

  useEffect(() => {
    if (barCode) {
      searchProduct(barCode);
      getParamsToDefault();
      // setProduct(false);
    }
  }, [barCode]);

  return (
    <div className="main-content">
      <div className="section-1-scan">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xs-12">
              <div className="title-general-home">Scan a product</div>
              <div className="text-general-home">
                Instructions for use: place the product barcode in front of the
                laptop camera and wait a couple of seconds.
              </div>
              <div>
                <p>Barcode: {barCodeNumber}</p>
              </div>
              <br />
              <br />
              <br />
              {!showSpinner && product && !errorMessage && (
                <div className="box-add-to-scan">
                  <div className="title-product">Product: {product.name}</div>

                  <div className="row">
                    <div className="col-md-4 col-xs-4">
                      Points:
                      <br />{' '}
                      <span className="points-number">{product.points}</span>
                    </div>
                    <div className="col-md-8 col-xs-8">
                      {!clickedBtn && !errorMessage && (
                        <button
                          type="button"
                          name="buttonaddproduct"
                          className="buttonaddproduct"
                          onClick={() => {
                            updatePoints(
                              product.id,
                              setShowSpinner,
                              setUser,
                              setErrorMessage,
                              setClickedBtn
                            );
                          }}
                        >
                          Add points
                        </button>
                      )}
                      {clickedBtn && !errorMessage && (
                        <span className=" disclaimer-points-added">
                          Points added!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {showSpinner && <Spinner />}
            </div>
            <div className="col-md-6 col-xs-12">
              <div className="scan-area">
                <BarcodeScannerComponent
                  width={450}
                  height={400}
                  onUpdate={(err, result) => {
                    if (result) {
                      setBarCode(result.text);
                    } else {
                      setBarCode(false);
                    }
                  }}
                />
              </div>
              <div className="disclaimer-points">
                Your total points: {user.totalPoints}
              </div>
            </div>
          </div>
          <br />
          <br />
          <ErrorMessage message={errorMessage} />
        </div>
      </div>
    </div>
  );
};

export default GetPoints;
