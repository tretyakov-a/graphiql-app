/* eslint-disable @typescript-eslint/no-explicit-any */
import classes from './style.module.scss';
import DropdownList from '../DropdownList';

interface Props {
  arr: JSON[];
}

const ItemsList = ({ arr }: Props) => {
  return (
    <ul className={classes.accordionItem}>
      {arr.map((el, i) => (
        <li key={el.name ? el.name : 'list' + i}>
          <DropdownList obj={el} />
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
