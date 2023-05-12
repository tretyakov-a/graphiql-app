import introspectionQuery from './introspection-query';
import { fetchData } from '../http';

const graphqlEndpoint = 'https://rickandmortyapi.com/graphql';

export const fetchSchema = (endpoint: string) => {
  return fetchQuery(endpoint, { query: introspectionQuery });
};

export const fetchQuery = async (
  endpoint: string,
  options: {
    query: string;
    variables?: Record<string, string>;
    headers?: Headers;
  }
) => {
  const { query, variables = {}, headers = {} } = options;
  try {
    return await fetchData(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  } catch (err) {
    throw err;
  }
};
