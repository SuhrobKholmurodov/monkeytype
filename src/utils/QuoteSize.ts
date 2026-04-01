import { Language } from "~/@types";
import { englishQuotesArray, germanQuotesArray, russianQuotesArray } from "~/constants";

export const getQuoteSizes = (selectedLanguage: Language) => {
  const arrays = {
    english: englishQuotesArray,
    russian: russianQuotesArray,
    german: germanQuotesArray,
  };

  const selectedArray = arrays[selectedLanguage] || englishQuotesArray;

  return {
    short: selectedArray.filter((el) => el.split(" ").length <= 15),
    medium: selectedArray.filter((el) => {
      const count = el.split(" ").length;
      return count > 15 && count <= 30;
    }),
    long: selectedArray.filter((el) => el.split(" ").length > 30),
  };
};
