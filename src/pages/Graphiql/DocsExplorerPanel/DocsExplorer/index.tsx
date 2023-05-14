import Loader from '@src/components/Loader';
import { useAppDispatch, useGraphqlStore } from '@src/store';
import { Loading } from '@src/store/graphql/types';
import { memo, useEffect } from 'react';

const DocsExplorer = memo(() => {
  const {
    schema: { loading, response, error },
    actions: { fetchGraphqlSchema },
  } = useGraphqlStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGraphqlSchema({}));
  }, [dispatch, fetchGraphqlSchema]);

  return (
    <>
      <h2 style={{ marginBottom: '1rem' }}>Docs</h2>
      {loading === Loading.PENDING ? (
        <Loader />
      ) : error === null && response !== null ? (
        <ul>
          {response.data?.__schema.types.map((type) => (
            <li key={type.name} style={{ marginBottom: '0.5rem' }}>
              <h3>{type.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-xl)' }}>{type.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </>
  );
});

export default DocsExplorer;
