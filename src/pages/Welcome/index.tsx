import { useTranslation } from 'react-i18next';
import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import DeveloperCard from './DeveloperCard';
import { githubLinks } from '@src/shared/data/githubLinks';

const Welcome = () => {
  const { t } = useTranslation('welcomeLocalisation');
  return (
    <PageWrapper pageClassName={classes.welcome}>
      <h2 className={classes.welcomeHeader}>{t('welcome')}</h2>
      <h3 className={classes.welcomeHeader}>{t('ourTeam')}</h3>
      <div className={classes.welcomeCardsConteiner}>
        {githubLinks.map((el) => (
          <div key={el.name} className={classes.welcomeCardsBlock}>
            <DeveloperCard {...el} />
          </div>
        ))}
      </div>
      <h3 className={classes.welcomeHeader}>{t('ourProject')}</h3>
      <div className={classes.welcomeDesc}>
        <p>
          {t('projectDesc1')} <a href="https://rs.school/react/">{t('React course')}</a>.{' '}
          {t('projectDesc2')}
        </p>
        <p>{t('projectDesc3')}</p>
      </div>
      <h3 className={classes.welcomeHeader}>{t('ourSchool')}</h3>
      <div className={classes.welcomeDesc}>{t('schoolDesc')}</div>
    </PageWrapper>
  );
};

export default Welcome;
