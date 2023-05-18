import Loader from '@src/components/Loader';
import { useAppDispatch, useGraphqlStore } from '@src/store';
import { Loading } from '@src/store/graphql/types';
import { Field, TypeOfType } from '@src/shared/api/graphql/schema-types';
import { memo, useEffect } from 'react';
import useStateHistory from '@src/shared/hooks/stateHistoryHook';
import TypeElement, { Element as State } from './TypeElement';
import classes from './TypeElement/style.module.scss';
import { getNameFromSchema as getName } from './utils';

const DocsExplorer = memo(() => {
  const {
    schema: { loading, response, error },
    actions: { fetchGraphqlSchema },
  } = useGraphqlStore();
  const dispatch = useAppDispatch();

  const [currentState, addState, backState, prevState] = useStateHistory<State>();

  useEffect(() => {
    dispatch(fetchGraphqlSchema({}));
  }, [dispatch, fetchGraphqlSchema]);

  const handleField = (field: Field) => {
    console.log(field);
    if (field.name !== null) {
      addState({ ...field });
    }
  };

  const handleFirstQuery = (name: string | null | undefined) => {
    const typeObj = response?.data?.__schema.types.find((el) => el.name === name);
    if (typeObj) {
      addState(typeObj);
    }
  };

  const handleType = (type: TypeOfType | undefined | null) => {
    const typeName: string | undefined = getName(type);
    const typeObj = response?.data?.__schema.types.find((el) => el.name === typeName);
    if (typeObj) {
      addState(typeObj);
    }
  };

  const handleBack = () => {
    backState();
  };

  return (
    <>
      <h2 style={{ marginBottom: '1rem' }}>Docs</h2>
      {loading === Loading.PENDING ? (
        <Loader />
      ) : error === null && response !== null ? (
        <div>
          {!currentState && (
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
          {currentState && (
            <TypeElement
              parentName={prevState?.name || 'Docs'}
              element={currentState}
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
