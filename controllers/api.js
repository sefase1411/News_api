import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://eventregistry.org/api/v1";
const NEWS_API = axios.create({
    baseURL: BASE_URL,
    params: {
      apiKey: API_KEY,
    },
  });

  const CATEGORIES = {
    'business': 'news/Business',
    'politics': 'news/Politics',
    'technology': 'news/Technology',
    'environment': 'news/Environment',
    'health': 'news/Health',
    'science': 'news/Science',
    'sports': 'news/Sports',
    'arts_and_entertainment': 'news/Arts_and_Entertainment'
};
  
class api {


    static async search({ page = '1', pageSize = '10', language = 'eng', fromDate, toDate,  query,  category }) {

      try {
            const response = await NEWS_API.get(`/article/getArticles`, {
                params: {
                keyword: query,
                articlesPage: page,
                articlesCount: pageSize,
                lang: language,
                dateStart: fromDate,
                dateEnd: toDate,
                categoryUri: CATEGORIES[category]
                },
            });

            return response.data.articles.results;
        }
        catch (error) { return `Error en la petición, codigo ${error.response.status}`; }
    }

    static async getData(id) {

        try {
            const response = await NEWS_API.get(`/article/getArticle`, {
                params: {
                articleUri: id
                },
            });

            return response.data;
        }
        catch (error) { return `Error en la petición, codigo ${error}`; }
    }

    static async getBreaking( { page = '1', pageSize = '10', region, category} ) {

        try {
            const response = await NEWS_API.get(`event/getBreakingEvents`, {
                params: {
                articlesPage: page,
                articlesCount: pageSize,
                categoryUri: CATEGORIES[category],
                },
            });

            let finalData = response.data.breakingEvents.results
            let dataRegion = {}

            for (const article in finalData) {
                 if (finalData[article].location)
                    {
                        if (finalData[article].location.country.label.eng == region)
                        {
                            dataRegion[article] = finalData[article]
                        }
                    }
                }
            return region ? dataRegion : finalData;
        }
        catch (error) { return `Error en la petición, codigo ${error.response.status}`; }

    }

}

export default api;
