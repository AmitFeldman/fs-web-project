import secrets from './secrets';

interface ApiConfig {
  apiKey: string;
}

const news: ApiConfig = {
  apiKey: secrets.newsApiKey,
};

const google: ApiConfig = {
  apiKey: secrets.googleApiKey,
};

export {news, google};
