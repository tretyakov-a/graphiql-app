/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import classes from './style.module.scss';
import ItemsList from '../ItemsList';

interface Props {
  obj: any;
  key?: string;
}

const DropdownList = ({ obj, key }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShow = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const keyArr = Object.keys(obj);
  console.log(obj);
  return (
    <ul key={'obj' + keyArr.length}>
      {keyArr.length > 0 ? (
        <div>
          <span>{key || obj.name}</span>
          <button onClick={handleShow}>{isOpen ? 'hide' : 'show'}</button>
          {isOpen &&
            keyArr.map((key, i) => {
              if (Object.is(obj[key], null) || obj[key] === undefined) {
                return;
              } else if (
                typeof obj[key] === 'string' ||
                typeof obj[key] === 'number' ||
                typeof obj[key] === 'boolean'
              ) {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <li key={'key' + i}>
                    {key}: <span>{obj[key]}</span>
                  </li>
                );
              } else if (Array.isArray(obj[key])) {
                return (
                  <li key={'key' + i}>
                    {key}:
                    <ItemsList arr={obj[key]} />
                  </li>
                );
              } else if (obj[key] instanceof Object) {
                // return DropdownList(obj[key]);
              } else {
                return (
                  <li key={key + i}>
                    {key}: <button onClick={handleShow}>{isOpen ? 'hide' : 'show'}</button>
                    {/* {!isOpen ?? checkType(obj[key])} */}
                  </li>
                );
              }
            })}
        </div>
      ) : (
        <li>
          {keyArr[0]}: <span>{obj[keyArr[0]]}</span>
        </li>
      )}
    </ul>
  );
  // };

  // return (
  //   <div className={classes.accordion}>
  //     {!schema.data.__schema ? <span>No data and more</span> : checkType(schema.data.__schema)}
  //   </div>
  // );
};

export default DropdownList;
