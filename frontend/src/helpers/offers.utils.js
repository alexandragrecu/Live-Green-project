import * as offerService from './../services/offer.service';
import * as userOptions from './user.utils';

export const getOffers = async (
  setShowSpinner,
  setOffers,
  setErrorMessage,
  params,
  e
) => {
  if (e) {
    e.preventDefault();
  }
  setShowSpinner(true);
  const response = await offerService.getOffers(params);
  if (response) {
    if (response.status === 200) {
      if (response.data.data.offers.length) {
        setOffers(response.data.data.offers);
      } else {
        setErrorMessage('We do not have offers with your preferences.');
      }
    }
  } else {
    setErrorMessage('An error occured. Please refresh the page.');
  }
  setShowSpinner(false);
};

export const getF = () => {
  const a = 'hello';
  const b = true;

  if (a === 'hello') {
    if (b === true) {
      if (true) {
        if (1 < 4) {
          if (2 > 1) {
            console.log('helllo');
          }
        }
      }
    }
  }
};

export const getOffer = async (
  id,
  setShowSpinner,
  setUser,
  setErrorMessage,
  setSuccessMessage,
  setClickedBtn
) => {
  setShowSpinner(true);
  setClickedBtn(true);
  const response = await offerService.getOffer(id);

  if (response) {
    if (response.status === 200) {
      setSuccessMessage('Congrats! Check your email!');
      let userUpdated = await userOptions.getUser(setUser);
      console.log('userUpdated', userUpdated);
    } else {
      setErrorMessage('An error occurred, please try again!');
    }
  } else {
    setErrorMessage('An error occurred, please try again later!');
  }

  setShowSpinner(false);
};

export const searchOffer = async (
  e,
  keyword,
  setOffers,
  setShowSpinner,
  setErrorMessage
) => {
  e.preventDefault();
  setShowSpinner(true);
  const response = await offerService.searchOffer({ name: keyword });

  if (response) {
    if (response.status === 200) {
      if (response.data.offers.length) {
        setOffers(response.data.offers);
      } else {
        setErrorMessage(
          'We could not find any offers. Please try another word.'
        );
        setOffers([]);
      }
    } else {
      setErrorMessage(
        'An error occurred while searching offers. Please try again later.'
      );
    }
  }
  setShowSpinner(false);
};
