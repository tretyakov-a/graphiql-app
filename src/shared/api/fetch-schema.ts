import introspectionQuery from './introspection-query';

const graphqlEndpoint = 'https://rickandmortyapi.com/graphql';

export const fetchSchema = async () => {
  try {
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationName: 'IntrospectionQuery',
        query: introspectionQuery,
        // variables: {},
      }),
    });

    const schema = await response.json();
    return schema;
  } catch (err) {
    throw err;
  }
};
