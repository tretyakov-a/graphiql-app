import introspectionQuery from './introspection-query';

const graphqlEndpoint = 'https://rickandmortyapi.com/graphql';

export const getSchema = async () => {
  try {
    const response = await fetch(graphqlEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const schema = await response.json();
    return schema;
  } catch (err) {
    throw err;
  }
};
