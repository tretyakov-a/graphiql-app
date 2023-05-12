/* eslint-disable @typescript-eslint/no-explicit-any */
import btnClasses from '@src/styles/button.module.scss';
import { useState } from 'react';
import classes from './style.module.scss';
import ItemsList from '../ItemsList';
import { classNames } from '@src/shared/utils';

interface Props {
  obj: any;
  parentKey?: string;
}

const DropdownList = ({ obj, parentKey }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShow = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const listOpenClasses = classNames([classes.treeDirectory, isOpen && classes.open]);

  const classesBtn = classNames([
    btnClasses.button,
    isOpen && btnClasses.buttonActive,
    classes.treeOpenBtn,
  ]);

  const keyArr = Object.keys(obj);
  console.log(obj);
  return (
    <ul className={classes.tree}>
      {keyArr.length === 0 ? (
        <li className={classes.treeItem}>
          {parentKey}: <span>{obj}</span>
        </li>
      ) : (
        <>
          <li className={listOpenClasses}>
            <button onClick={handleShow} className={classesBtn}>
              {isOpen ? '-' : '+'}
            </button>
            <span className={classes.treeHeader}>{parentKey || obj.name}</span>
          </li>
          <ul className={classes.tree}>
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
                    <li key={'key' + i} className={classes.treeItem}>
                      {key}: <span>{obj[key]}</span>
                    </li>
                  );
                } else if (Array.isArray(obj[key])) {
                  return (
                    <li key={'key' + i} className={classes.treeItem}>
                      {key}:
                      <ItemsList arr={obj[key]} />
                    </li>
                  );
                } else if (obj[key] instanceof Object) {
                  return (
                    <li key={'key' + i} className={classes.treeItem}>
                      <DropdownList obj={obj[key]} parentKey={key} />
                    </li>
                  );
                }
              })}
          </ul>
        </>
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
