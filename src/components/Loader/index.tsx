import classes from './style.module.scss';

interface LoaderProps {
  size?: number;
}

const Loader = ({ size = 0.6 }: LoaderProps) => {
  return (
    <div className={classes.loaderContainer}>
      <div
        className={classes.ldsDualRing}
        style={{ transform: `scale(${size > 1 ? 1 : size})` }}
      ></div>
    </div>
  );
};

export default Loader;
