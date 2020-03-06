import secrets from './secrets';

interface newsConfig {
  apiKey: string;
}

const news: newsConfig = {
  apiKey: secrets.apiKey,
};

export {news};
