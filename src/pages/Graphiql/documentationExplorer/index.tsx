/* eslint-disable @typescript-eslint/no-explicit-any */
import DropdownList from './DropdownList';
import ItemsList from './ItemsList';
import classes from './style.module.scss';

interface Props {
  schema: JSON;
}

const DocumentationExplorer = ({ schema }: Props) => {
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
    <div className={classes.accordion}>
      {!schema.data.__schema ? (
        <span>No data and more</span>
      ) : schema.data.__schema instanceof Object ? (
        <DropdownList obj={schema.data.__schema} />
      ) : (
        <span>Schema is not an object</span>
      )}
    </div>
  );
};

export default DocumentationExplorer;
