/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchSchema } from '@src/shared/api/fetch-schema';
import { useEffect, useState } from 'react';
import DropdownList from './DropdownList';
import ItemsList from './ItemsList';
import classes from './style.module.scss';

const DocumentationExplorer = () => {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleClick = async () => {
    try {
      setLoading(true);
      const schema = await fetchSchema();
      if (schema.data.__schema instanceof Object) {
        setSchema(schema.data.__schema);
      } else {
        throw new Error('No schema fetched');
      }
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       const schema = await fetchSchema();
  //       if (schema.data.__schema instanceof Object) {
  //         setSchema(schema.data.__schema);
  //       } else {
  //         throw new Error('No schema fetched');
  //       }
  //     } catch (error) {
  //       setError(error as Error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // });

  // const checkType = (el: any): JSX.Element | undefined => {
  //   if (Object.is(el, null)) {
  //     return <br></br>;
  //   } else if (typeof el === 'string' || typeof el === 'string' || typeof el === 'boolean') {
  //     return <span>{el}</span>;
  //   } else if (Array.isArray(el)) {
  //     return <ItemsList arr={el} />;
  //   } else if (el instanceof Object) {
  //     return <DropdownList obj={el} />;
  //   } else {
  //     return;
  //   }
  // };

  return (
    <div className={classes.tree}>
      <button onClick={handleClick}>Fetch schema</button>
      {/* {!schema.data.__schema ? (
        <span>No data and more</span>
      ) : schema.data.__schema instanceof Object ? (
        <DropdownList obj={schema.data.__schema} />
      ) : (
        <span>Schema is not an object</span>
      )} */}
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {schema && <DropdownList obj={schema} />}
    </div>
  );
};

export default DocumentationExplorer;
