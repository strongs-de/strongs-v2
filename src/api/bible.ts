import Api from "../services/Api";

// function delay(ms: number) {
//   return new Promise( resolve => setTimeout(resolve, ms) );
// }

// export const getOriginTranslations = () => {
//   return [
//     {identifier: 'GNTTR', name: 'Textus Rezeptus'},
//   ]
// }

export const getTranslations = async () => {
    try {
      const response = await Api.get(`/translations.json`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

export const getChapter = async (translation: String, book: Number, chapter: Number) => {
    try {
      const response = await Api.get(`/${translation}/${book}/${chapter}.json`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

export const getVerse = async (translation: String, book: Number, chapter: Number, verse: Number) => {
    try {
      const response = await Api.get(`/${translation}/${book}/${chapter}/${verse}.json`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

export const getStrongDetails = async (translation: String, lang: String, strongNumber: Number) => {
    try {
        const response = await Api.get(`/${translation}/${lang}_strongs/${strongNumber}.json`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getStrongDetailsByBook = async (translation: String, book: Number, strongNumber: Number) => {
    try {
      const response = await Api.get(`/${translation}/${book <= 39 ? "hebrew_strongs" : "greek_strongs"}/${strongNumber}.json`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

export const getSearchResults = async (translation: String, query: String) => {
    try {
        const response = await Api.get(`/${translation}/${query}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
