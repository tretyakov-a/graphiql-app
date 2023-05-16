import classes from './style.module.scss';

const Loader = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.ldsDualRing}></div>
    </div>
  );
};

export default Loader;
