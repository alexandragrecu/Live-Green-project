import * as profileService from './../services/profile.service';

export const getRewards = async (
  setShowSpinner,
  setErrorMessage,
  setRewards
) => {
  setShowSpinner(true);
  const response = await profileService.getRewards();
  if (response) {
    if (response.status === 200) {
      const rewards = response.data.data.rewards;
      if (rewards.length) {
        setRewards(rewards);
      }
    } else {
      setErrorMessage('An error occured. Please try again later.');
    }
  }

  setShowSpinner(false);
};
