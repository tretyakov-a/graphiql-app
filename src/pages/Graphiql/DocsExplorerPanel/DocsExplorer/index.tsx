import Loader from '@src/components/Loader';
import { useAppDispatch, useGraphqlStore, useDocsExplorer } from '@src/store';
import { Loading } from '@src/store/graphql/types';
import { Field, TypeOfType, SchemaType } from '@src/shared/api/graphql/schema-types';
import { ChangeEvent, memo, useEffect, useState } from 'react';
import TypeElement from './TypeElement';
import classes from './style.module.scss';
import btnClasses from '@src/styles/button.module.scss';
import { getNameFromSchema as getName } from './utils';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHome, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { getPerfomedNameFromSchema as getPerfomedName } from './utils';
import { classNames } from '@src/shared/utils';
import IconButton from '@src/components/IconButton';

const DocsExplorer = memo(() => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');
  const [prevSearchValue, setPrevSearchValue] = useState('');
  const {
    schema: { loading, response, error },
    actions: { fetchGraphqlSchema },
    endpoint,
  } = useGraphqlStore();
  const {
    docsExplorer,
    actions: { addElement, deliteLast, clearHistory },
  } = useDocsExplorer();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearHistory());
    dispatch(fetchGraphqlSchema({}));
    setSearchValue('');
    setPrevSearchValue('');
  }, [dispatch, fetchGraphqlSchema, endpoint, clearHistory]);

  const handleField = (field: Field) => {
    if (field.name !== null) {
      dispatch(addElement({ ...field }));
    }
    handleBlur();
  };

  const handleFirstQuery = (name: string | null | undefined) => {
    const typeObj = response?.data?.__schema.types.find((el) => el.name === name);
    if (typeObj) {
      dispatch(addElement(typeObj));
    }
    handleBlur();
  };

  const handleType = (type: TypeOfType | undefined | null) => {
    const typeName: string | undefined = getName(type);
    const typeObj = response?.data?.__schema.types.find((el) => el.name === typeName);
    if (typeObj) {
      dispatch(addElement(typeObj));
    }
    handleBlur();
  };

  const handleBack = () => {
    if (docsExplorer.length > 0) {
      dispatch(deliteLast());
    }
    if (prevSearchValue && docsExplorer.length === 1) {
      setSearchValue(prevSearchValue);
      setPrevSearchValue('');
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value.trim().toLowerCase());
    dispatch(clearHistory());
  };

  const handleBlur = () => {
    if (searchValue) {
      setPrevSearchValue(searchValue);
      setSearchValue('');
    }
  };

  const schemaHome = () => {
    setPrevSearchValue('');
    setSearchValue('');
    dispatch(clearHistory());
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <>
      {loading === Loading.PENDING ? (
        <Loader />
      ) : error === null && response !== null ? (
        <div>
          <div className={classes.SearchBlock}>
            <IconButton icon={faHome} onClick={schemaHome} tooltip={{ langKey: 'home' }} />
            <input
              type="text"
              name="search"
              className={classes.SearchInput}
              value={searchValue}
              onChange={(e) => handleSearch(e)}
              placeholder={t('search') || ''}
            />
            <span className={classes.SearchIcon}>
              <FontAwesomeIcon icon={faSearch} size="sm" />
            </span>
            <button
              className={classNames([btnClasses.button, classes.clearBtn])}
              onClick={() => clearSearch()}
              disabled={!searchValue}
            >
              <FontAwesomeIcon icon={faXmark} size="sm" />
            </button>
          </div>
          {docsExplorer.length === 0 && !searchValue && !prevSearchValue && (
            <>
              <h2 style={{ marginBottom: '1rem' }}>Docs</h2>
              {response?.data?.__schema.types && !searchValue && (
                <>
                  <ReactMarkdown className={classes.docsDesc}>
                    {response?.data?.__schema.types.find((el) => el.name === '__Schema')
                      ?.description || ''}
                  </ReactMarkdown>
                  <h4 className={classes.docsSubHeader}>
                    <FontAwesomeIcon icon={faBook} size="sm" /> {t('rootTypes')}
                  </h4>
                </>
              )}
              <ul className={classes.docsList}>
                {response.data?.__schema &&
                  !searchValue &&
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
          {docsExplorer.length > 0 && !searchValue && (
            <TypeElement
              parentName={
                docsExplorer.length > 1
                  ? docsExplorer[docsExplorer.length - 2].name
                  : prevSearchValue
                  ? `Search: ${prevSearchValue}`
                  : 'Docs'
              }
              element={docsExplorer[docsExplorer.length - 1]}
              handleBack={handleBack}
              handleField={handleField}
              handleType={handleType}
            />
          )}
          {searchValue && response?.data?.__schema.types && (
            <ul className={classes.docsList}>
              {response?.data?.__schema.types.map(
                (el) =>
                  el.name?.toLowerCase().includes(searchValue) && (
                    <li className={classes.docsItem} key={el.name}>
                      <a onClick={() => handleFirstQuery(el.name)} className={classes.docsLinkType}>
                        {el.name}
                      </a>
                    </li>
                  )
              )}
              {response?.data?.__schema.types.map((el) =>
                el.fields
                  ? el.fields.map((field) => {
                      if (field.name && field.name.toLowerCase().includes(searchValue)) {
                        return (
                          <li key={el.name + field.name} className={classes.docsItem}>
                            <span className={classes.docsInfo}>{el.name}.</span>
                            <a onClick={() => handleField(field)} className={classes.docsLinkField}>
                              {field.name}
                            </a>
                            :{' '}
                            <a
                              onClick={() => handleType(field.type)}
                              className={classes.docsLinkType}
                            >
                              {getPerfomedName(field.type)}
                            </a>
                          </li>
                        );
                      }
                    })
                  : el.inputFields
                  ? el.inputFields.map((field) => {
                      if (field.name && field.name.toLowerCase().includes(searchValue)) {
                        return (
                          <li key={field.name} className={classes.docsItem}>
                            <span className={classes.docsInfo}>{field.name}</span>:{' '}
                            <a
                              onClick={() => handleType(field.type)}
                              className={classes.docsLinkType}
                            >
                              {getPerfomedName(field.type)}
                            </a>
                          </li>
                        );
                      }
                    })
                  : null
              )}
            </ul>
          )}
        </div>
      ) : (
        <p className={classes.docsError}>{t('docsUnavailible', { endpoint })}</p>
      )}
    </>
  );
});

export default DocsExplorer;
