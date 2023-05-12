/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchSchema } from '@src/shared/api/fetch-schema';
import { useEffect, useState } from 'react';
import DropdownList from './DropdownList';
import classes from './style.module.scss';

const DocumentationExplorer = () => {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // const handleClick = async () => {
  //   try {
  //     setLoading(true);
  //     const schema = await fetchSchema();
  //     if (schema.data.__schema instanceof Object) {
  //       setSchema(schema.data.__schema);
  //     } else {
  //       throw new Error('No schema fetched');
  //     }
  //   } catch (error) {
  //     setError(error as Error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <div className={classes.tree}>
      {/* <button onClick={handleClick}>Fetch schema</button> */}
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {schema && <DropdownList obj={schema} />}
    </div>
  );
};

export default DocumentationExplorer;
