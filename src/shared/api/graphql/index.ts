import introspectionQuery from './introspection-query';
import { fetchData } from './http';
import { i18n } from '@src/shared/localization';
import { GraphqlSchema } from './schema-types';

export const fetchSchema = (endpoint: string) => {
  return fetchQuery<GraphqlSchema>(endpoint, { query: introspectionQuery });
};

export const fetchQuery = async <T>(
  endpoint: string,
  options: {
    query: string;
    variables?: string;
  }
) => {
  const { query, variables = '{}' } = options;

  let parsedVariables: object = {};
  try {
    parsedVariables = JSON.parse(variables === '' ? '{}' : variables);
  } catch (jsonError) {
    throw new Error(
      String(i18n.t('errors.jsonVariables', { message: (jsonError as Error).message }))
    );
  }

  try {
    return await fetchData<T>(endpoint, {
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
export type { GraphqlSchema } from './schema-types';
