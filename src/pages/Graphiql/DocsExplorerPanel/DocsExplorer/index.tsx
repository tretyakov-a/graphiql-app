import Loader from '@src/components/Loader';
import { useAppDispatch, useGraphqlStore, useDocsExplorer } from '@src/store';
import { Loading } from '@src/store/graphql/types';
import { Field, TypeOfType } from '@src/shared/api/graphql/schema-types';
import { memo, useEffect } from 'react';
import TypeElement from './TypeElement';
import classes from './TypeElement/style.module.scss';
import { getNameFromSchema as getName } from './utils';

const DocsExplorer = memo(() => {
  const {
    schema: { loading, response, error },
    actions: { fetchGraphqlSchema },
  } = useGraphqlStore();
  const {
    docsExplorer,
    actions: { addElement, deliteLast },
  } = useDocsExplorer();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGraphqlSchema({}));
  }, [dispatch, fetchGraphqlSchema]);

  const handleField = (field: Field) => {
    console.log(field);
    if (field.name !== null) {
      dispatch(addElement({ ...field }));
    }
  };

  const handleFirstQuery = (name: string | null | undefined) => {
    const typeObj = response?.data?.__schema.types.find((el) => el.name === name);
    if (typeObj) {
      dispatch(addElement(typeObj));
    }
    console.log(docsExplorer);
  };

  const handleType = (type: TypeOfType | undefined | null) => {
    const typeName: string | undefined = getName(type);
    const typeObj = response?.data?.__schema.types.find((el) => el.name === typeName);
    if (typeObj) {
      dispatch(addElement(typeObj));
    }
  };

  const handleBack = () => {
    dispatch(deliteLast());
  };

  return (
    <>
      <h2 style={{ marginBottom: '1rem' }}>Docs</h2>
      {loading === Loading.PENDING ? (
        <Loader />
      ) : error === null && response !== null ? (
        <div>
          {docsExplorer.length === 0 && (
            <ul>
              <span>query: </span>
              <a
                onClick={() => handleFirstQuery(response.data?.__schema.queryType?.name)}
                className={classes.docsLinkType}
              >
                {response.data?.__schema.queryType?.name}
              </a>
            </ul>
          )}
          {docsExplorer.length > 0 && (
            <TypeElement
              parentName={
                docsExplorer.length > 1 ? docsExplorer[docsExplorer.length - 2].name : 'Docs'
              }
              element={docsExplorer[docsExplorer.length - 1]}
              handleBack={handleBack}
              handleField={handleField}
              handleType={handleType}
            />
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
});

export default DocsExplorer;
