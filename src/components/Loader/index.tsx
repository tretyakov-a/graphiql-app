import { classNames } from '@src/shared/utils';
import classes from './style.module.scss';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const Loader = ({ size = 'md' }: LoaderProps) => {
  return (
    <div className={classNames([classes.loaderContainer, classes[`loaderContainer_${size}`]])}>
      <div className={classes.ldsDualRing}></div>
    </div>
  );
};

export default Loader;
