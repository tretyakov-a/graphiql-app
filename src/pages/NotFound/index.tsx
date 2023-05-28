import { Link } from 'react-router-dom';
import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <PageWrapper
      pageClassName={classes.notFoundPage}
      pageContainerClassName={classes.notFoundPageContainer}
    >
      <h2 className={classes.notFoundPageTitle}>404</h2>
      <h3 className={classes.notFoundPageSubtitle}>{t('notFoundTitle')}</h3>
      <p className={classes.notFoundPageInfo}>{t('notFoundInfo')}</p>
      <Link className={classes.notFoundPageLink} to="/">
        {t('notFoundBtnText')}
      </Link>
    </PageWrapper>
  );
};

export default NotFound;
