import {news} from '../config/config';
import {getRandomInt} from './random-util';

const NUM_ARTICLES = 20;
const NEWS_API_URL = `http://newsapi.org/v2/top-headlines?country=us&pageSize=${NUM_ARTICLES}&apiKey=${news.apiKey}`;

let articles: Article[] = [];

export interface Article {
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

interface NewsApiResult {
  status: string;
  articles: Article[];
}

const api = <Response>(url: string): Promise<Response> => {
  return fetch(url).then(r => r.json());
};

const getArticles = async (): Promise<Article[]> => {
  const result = await api<NewsApiResult>(NEWS_API_URL);
  return result.articles;
};

const initArticles = async () => {
  const result = await getArticles();
  articles = result.filter(a => Boolean(a));
};

const getArticle = (): Article => {
  return articles[getRandomInt(0, NUM_ARTICLES)];
};

export {getArticle, initArticles};
