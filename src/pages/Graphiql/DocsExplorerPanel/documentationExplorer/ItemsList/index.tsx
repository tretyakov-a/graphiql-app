/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from './style.module.scss';
import DropdownList from '../DropdownList';

interface Props {
  arr: JSON[];
}

const ItemsList = ({ arr }: Props) => {
  return (
    <ul className={classes.tree}>
      {arr.map((el, i) => {
        if (typeof el === 'string' || typeof el === 'number' || typeof el === 'boolean') {
          return (
            <li key={'key' + i} className={classes.treeItem}>
              {el}
            </li>
          );
        } else if (el instanceof Object) {
          return (
            <li key={el.name ? el.name : 'list' + i} className={classes.treeItem}>
              <DropdownList obj={el} />
            </li>
          );
        }
      })}
    </ul>
  );
};

export default ItemsList;
