import introspectionQuery from './introspection-query';
import { fetchData } from './http';

export const fetchSchema = (endpoint: string) => {
  return fetchQuery(endpoint, { query: introspectionQuery });
};

export const fetchQuery = async (
  endpoint: string,
  options: {
    query: string;
    variables?: string;
  }
) => {
  const { query, variables = '' } = options;
  try {
    return await fetchData(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: JSON.parse(variables),
      }),
    });
  } catch (err) {
    throw err;
  }
};

export type { GraphqlError, GraphqlResponse } from './types';
