const PROTOCOL = 'http';
const DOMAIN_NAME = 'localhost';
const PORT = '8080';
const URL = `${PROTOCOL}://${DOMAIN_NAME}:${PORT}`;

const buildApiURL = (route: string): string => `${URL}/api/${route}`;

const DEFAULT_HEADERS: RequestInit['headers'] = {
  'content-type': 'application/json',
  Accept: 'application/json',
};

interface RequestConfig<B> extends Omit<RequestInit, 'body'> {
  body?: B;
}

// Sends all api requests to server
const client = <Body, Response>(
  route: string,
  {body, ...customConfig}: RequestConfig<Body> = {}
): Promise<Response> => {
  const url = buildApiURL(route);

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...DEFAULT_HEADERS,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config)
    .then(r => r.json())
    .catch(err => console.log(err));
};

export default client;
