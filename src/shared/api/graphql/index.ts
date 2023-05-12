import introspectionQuery from './introspection-query';
import { fetchData } from './http';
import { i18n } from '@src/shared/localization';

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
  const { query, variables = '{}' } = options;
  let parsedVariables: object = {};

  try {
    parsedVariables = JSON.parse(variables);
  } catch (jsonError) {
    throw new Error(String(i18n.t('jsonVariables', { message: (jsonError as Error).message })));
  }

  try {
    return await fetchData(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: parsedVariables,
      }),
    });
  } catch (err) {
    throw err;
  }
};

export type { GraphqlError, GraphqlResponse } from './types';
