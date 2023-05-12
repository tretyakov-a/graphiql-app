import { useAppDispatch, useGraphqlStore } from '@src/store';
import { Loading } from '@src/store/graphql/types';
import { useEffect } from 'react';

const DocsExplorer = () => {
  const {
    schema: { loading, data, error },
    actions: { fetchGraphqlSchema },
  } = useGraphqlStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGraphqlSchema({}));
  }, [dispatch, fetchGraphqlSchema]);

  return (
    <>
      <h2>Docs</h2>
      {loading === Loading.PENDING ? (
        <div>Loading...</div>
      ) : error === null && data !== null ? (
        <>
          <p>Schema was loaded</p>
          <br />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default DocsExplorer;
