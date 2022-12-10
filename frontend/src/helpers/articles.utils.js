import * as articleService from './../services/articles.service';

export const getArticles = async (
  setShowSpinner,
  setArticles,
  setErrorMessage
) => {
  setShowSpinner(true);
  const response = await articleService.getArticles();

  if (response) {
    if (response.status === 200) {
      setArticles(response.data.data.articles);
    } else {
      setErrorMessage('An error occured. Please try again later.');
    }
  }

  setShowSpinner(false);
};
