import secrets from './secrets';

interface newsConfig {
  apiKey: string;
}

const news: newsConfig = {
  apiKey: secrets.newsApiKey,
};

const google: newsConfig = {
  apiKey: secrets.googleApiKey,
};

export {news, google};
