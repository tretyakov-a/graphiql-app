import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={[generalClasses.container, classes.headerContainer].join(' ')}>
        <h1>HeaderLogo</h1>
        <nav className={classes.menuContainer}>
          <ul className={classes.menu}>
            <li>
              <NavLink to="/" className={classes.menuLink}>
                Welcome
              </NavLink>
            </li>
            <li>
              <NavLink to="/graphiql" className={classes.menuLink}>
                Graphiql
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth" className={classes.menuLink}>
                Sign In
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
