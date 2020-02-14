const PROTOCOL = 'http';
const DOMAIN_NAME = 'localhost';
const PORT = '8080';
const URL = `${PROTOCOL}://${DOMAIN_NAME}:${PORT}`;

const buildApiURL = (route: string) => `${URL}/api/${route}`;

const getApi = async <R>(route: string): Promise<R> => {
  const result = await fetch(buildApiURL(route));
  return await result.json();
};

const postApi = async <D, R>(route: string, data: D): Promise<R> => {
  const url = buildApiURL(route);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export {getApi, postApi};
