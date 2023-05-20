import Loader from '@src/components/Loader';
import { useAppDispatch, useGraphqlStore, useDocsExplorer } from '@src/store';
import { Loading } from '@src/store/graphql/types';
import { Field, TypeOfType, SchemaType } from '@src/shared/api/graphql/schema-types';
import { memo, useEffect } from 'react';
import TypeElement from './TypeElement';
import classes from './TypeElement/style.module.scss';
import { getNameFromSchema as getName } from './utils';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const DocsExplorer = memo(() => {
  const { t } = useTranslation();
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
    if (field.name !== null) {
      dispatch(addElement({ ...field }));
    }
  };

  const handleFirstQuery = (name: string | null | undefined) => {
    const typeObj = response?.data?.__schema.types.find((el) => el.name === name);
    if (typeObj) {
      dispatch(addElement(typeObj));
    }
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
      {loading === Loading.PENDING ? (
        <Loader />
      ) : error === null && response !== null ? (
        <div>
          {docsExplorer.length === 0 && (
            <>
              <h2 style={{ marginBottom: '1rem' }}>Docs</h2>
              {response?.data?.__schema.types && (
                <ReactMarkdown className={classes.docsDesc}>
                  {response?.data?.__schema.types.find((el) => el.name === '__Schema')
                    ?.description || ''}
                </ReactMarkdown>
              )}
              <h4 className={classes.docsSubHeader}>
                <FontAwesomeIcon icon={faBook} size="sm" /> {t('rootTypes')}
              </h4>
              <ul className={classes.docsList}>
                {response.data?.__schema &&
                  (Object.keys(response.data?.__schema) as (keyof SchemaType)[]).map((objKey) => {
                    const type = response.data?.__schema[objKey];
                    if (objKey.includes('Type') && type && !Array.isArray(type) && type.name) {
                      return (
                        <li className={classes.docsItem} key={objKey}>
                          <span className={classes.docsInfo}>{objKey.replace('Type', '')}: </span>
                          <a
                            onClick={() => handleFirstQuery(type.name)}
                            className={classes.docsLinkType}
                          >
                            {type.name}
                          </a>
                        </li>
                      );
                    }
                  })}
              </ul>
            </>
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
