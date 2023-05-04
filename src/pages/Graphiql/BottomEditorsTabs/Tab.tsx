import classes from './style.module.scss';

interface TabProps {
  isActive: boolean;
  component: JSX.Element;
}

const Tab = ({ isActive, component }: TabProps) => {
  return (
    <section className={classes.tab} style={{ display: isActive ? 'block' : 'none' }}>
      {component}
    </section>
  );
};

export default Tab;
