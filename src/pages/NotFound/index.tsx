import { Link } from 'react-router-dom';
import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';

const NotFound = () => {
  return (
    <PageWrapper
      pageClassName={classes.notFoundPage}
      pageContainerClassName={classes.notFoundPageContainer}
    >
      <h2 className={classes.notFoundPageTitle}>404</h2>
      <h3 className={classes.notFoundPageSubtitle}>Page not found</h3>
      <p className={classes.notFoundPageInfo}>
        Oops! The page you are looking for does not exist. It might have been mooved or deleted
      </p>
      <Link className={classes.notFoundPageLink} to="/">
        Back to welcome
      </Link>
    </PageWrapper>
  );
};

export default NotFound;
