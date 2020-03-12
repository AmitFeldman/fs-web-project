import {getToken} from './auth-client';

const PROTOCOL = 'http';
const DOMAIN_NAME = 'localhost';
const PORT = '8080';
const URL = `${PROTOCOL}://${DOMAIN_NAME}:${PORT}`;

const buildApiURL = (route: string): string => `${URL}/api/${route}`;

const DEFAULT_HEADERS: RequestInit['headers'] = {
  'content-type': 'application/json',
  Accept: 'application/json',
};

interface Error {
  error: string;
}

interface RequestConfig<B> extends Omit<RequestInit, 'body'> {
  body?: B;
}

// Sends all api requests to server
const client = <Body, Response>(
  route: string,
  {body, ...customConfig}: RequestConfig<Body> = {}
): Promise<Response> => {
  const url = buildApiURL(route);
  const token = getToken();

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...DEFAULT_HEADERS,
      ...customConfig.headers,
    },
  };

  // Add token to request if user is logged in
  if (token) {
    config.headers = {
      token,
      ...config.headers,
    };
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config)
    .then(r => r.json())
    .then(
      result =>
        new Promise((resolve, reject) => {
          const {error} = result;

          if (Boolean(error)) {
            reject(result);
          }

          resolve(result);
        })
    );
};

export default client;
