import * as productService from './../services/products.service';
import * as userOptions from './user.utils';

export const scanProduct = async (
  barCode,
  setShowSpinner,
  setProduct,
  setErrorMessage
) => {
  setShowSpinner(true);
  const data = { qrCode: barCode };
  let response = await productService.scanProduct(data);

  if (response) {
    if (response.status === 200) {
      const product = {
        name: response.data.data.name,
        points: response.data.data.points,
        barCode: response.data.data.qrCode,
        id: response.data.data._id,
      };
      setProduct(product);
    } else if (response.status === 401 || response.status === 404) {
      setErrorMessage(
        'We cannot find this product in our database. Please search for it in Products Section.'
      );
    } else {
      setErrorMessage('An error occured. Please try again later!');
    }
  }

  setShowSpinner(false);
};

export const updatePoints = async (
  id,
  setShowSpinner,
  setUser,
  setErrorMessage,
  setClickedBtn
) => {
  setShowSpinner(true);
  // id = '5fc411b283250e14b4a8b9c4';
  let response = await productService.updatePointsAfterScan({ id });
  if (response) {
    if (response.status === 200) {
      let userUpdated = await userOptions.getUser(setUser);
      console.log('userUpdated', userUpdated);
    } else if (response.status === 404) {
      setErrorMessage(
        'Product not found! Please try again to scan the product!'
      );
    } else {
      setErrorMessage('An error occured! Please try again later!');
    }
  }
  setShowSpinner(false);
  setClickedBtn(true);
};

export const getProducts = async (
  params,
  setProducts,
  setNumProducts,
  setErrorMessage,
  setShowSpinner
) => {
  setShowSpinner(true);
  let response = await productService.getProducts(params);
  if (response) {
    if (response.status === 200 && response.data.status === 'success') {
      setProducts(response.data.data.products);
      setNumProducts(response.data.numProducts);
    } else {
      setErrorMessage(
        'An error occured, we could not find products. Please refresh the page!'
      );
    }
  } else {
    setErrorMessage('An error occured, please try again later!');
  }
  setShowSpinner(false);
};

export const searchProduct = async (
  data,
  setProducts,
  setShowSpinner,
  setErrorMessage,
  setNrProducts,
  setProduct
) => {
  setShowSpinner(true);
  let response = await productService.searchProduct(data);

  if (response) {
    if (response.status === 200 && response.data.status === 'success') {
      if (response.data.products.length === 0) {
        setErrorMessage('We could not find products with this name.');
      } else {
        setProducts(response.data.products);
      }
      setNrProducts(response.data.products.length);
    } else {
      setErrorMessage('An error occured! Please try again later!');
    }
  }
  setShowSpinner(false);
};

export const createProduct = async (
  e,
  data,
  setProducts,
  setNrProducts,
  setErrorMessage,
  errorMessage,
  setSuccessMessage,
  setShowSpinner,
  setClickUpdate
) => {
  setClickUpdate(false);
  setShowSpinner(true);
  setErrorMessage(false);
  console.log('aaaa');
  e.preventDefault();
  data.points = parseInt(data.points, 10);
  data.weight = parseInt(data.weight, 10);

  if (data.points > 0 && data.weight > 0) {
    const response = await productService.createProduct(data);
    if (response) {
      if (response.status === 201 && response.data.status === 'success') {
        console.log('response', response);
        await getProducts(
          {},
          setProducts,
          setNrProducts,
          setErrorMessage,
          setShowSpinner
        );
        if (!errorMessage) {
          setSuccessMessage('Product successfully added!');
        }
      } else {
        setErrorMessage('An error occured! Please try again!');
      }
    } else {
      setErrorMessage('An error occured! Please try again!');
    }
  }
  setShowSpinner(false);
};

export const updateSpecificProduct = async (
  params,
  data,
  setProducts,
  setNrProducts,
  setErrorMessage,
  errorMessage,
  setSuccessMessage,
  setShowSpinner
) => {
  setShowSpinner(true);
  setErrorMessage(false);
  console.log('paraaams', params);
  if (data.points > 0 && data.weight > 0) {
    const response = await productService.updateProduct(params, data);
    console.log('responseee', response);
    if (response) {
      if (response.status === 200 && response.data.status === 'success') {
        await getProducts(
          {},
          setProducts,
          setNrProducts,
          setErrorMessage,
          setShowSpinner
        );
        if (!errorMessage) {
          setSuccessMessage('Product successfully updated!');
        }
      } else {
        setErrorMessage(
          'An error while updating the product. Please try again.'
        );
      }
    } else {
      setErrorMessage(
        'An error while updating the product. Please try again later.'
      );
    }
  }
  setShowSpinner(false);
};

export const deleteSpecificProduct = async (
  params,
  setProducts,
  setNrProducts,
  setErrorMessage,
  errorMessage,
  setSuccessMessage,
  setShowSpinner
) => {
  setShowSpinner(true);
  setErrorMessage(false);
  const response = await productService.deleteProduct(params);
  console.log('response for delete', response);
  if (response) {
    if (response.status === 204) {
      await getProducts(
        {},
        setProducts,
        setNrProducts,
        setErrorMessage,
        setShowSpinner
      );

      setSuccessMessage('Product successfully deleted.');
    } else {
      setErrorMessage('An error occured. Please try again later.');
    }
  } else {
    setErrorMessage('An error occured. Please try again later.');
  }

  setShowSpinner(false);
};
