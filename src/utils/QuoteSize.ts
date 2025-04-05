import { Language } from '~/@types';
import { englishQuotesArray, russianQuotesArray } from '~/constants';

export const getQuoteSizes = (selectedLanguage: Language) => ({
  short: (selectedLanguage === 'english' ? englishQuotesArray : russianQuotesArray).filter(
    (el) => el.split(' ').length <= 15,
  ),
  medium: (selectedLanguage === 'english' ? englishQuotesArray : russianQuotesArray).filter(
    (el) => {
      const words = el.split(' ').length;
      return words > 15 && words <= 30;
    },
  ),
  long: (selectedLanguage === 'english' ? englishQuotesArray : russianQuotesArray).filter(
    (el) => el.split(' ').length > 30,
  ),
});
