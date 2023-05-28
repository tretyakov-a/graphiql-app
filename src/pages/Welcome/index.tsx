import { useTranslation } from 'react-i18next';
import btnClasses from '@src/styles/button.module.scss';
import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import DeveloperCard from './DeveloperCard';
import { githubLinks } from '@src/shared/data/githubLinks';
import { classNames } from '@src/shared/utils';
import { type Feature, features } from './features';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@src/shared/api/firebase';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const { t } = useTranslation('welcomeLocalisation');
  const [user] = useAuthState(auth);
  const isAuthrorized = Boolean(user);

  const renderFeature = ({ name, description, iconSrc }: Feature) => {
    const translatedName = t(`features.${name}`);
    return (
      <li key={name} className={classes.featuresItem}>
        <div className={classes.featuresIcon}>
          <img src={iconSrc} alt={translatedName} />
        </div>
        <h3 className={classes.featuresTitle}>{translatedName}</h3>
        <p className={classes.featuresDesc}>{t(`features.${description}`)}</p>
      </li>
    );
  };

  return (
    <PageWrapper pageClassName={classes.welcome} pageContainerClassName={classes.welcomeContainer}>
      <section className={classes.hero}>
        <div className={classNames([classes.sectionContainer, classes.heroContainer])}>
          <div className={classes.heroWelcome}>{t('welcome')}</div>
          <h2 className={classes.heroTitle}>{t('welcomeTitle')}</h2>
          <h3 className={classes.heroSubtitle}>
            {t('welcomeSubtitle')}
            <a href="https://rs.school/react/" target="_blank">
              RSSchool React
            </a>
            {t('course')}
          </h3>
          <Link
            className={classNames([btnClasses.button, classes.heroButton])}
            to={isAuthrorized ? '/graphiql' : '/auth'}
          >
            Go to the app
          </Link>
        </div>
      </section>

      <section className={classes.features}>
        <div className={classNames([classes.sectionContainer, classes.featuresContainer])}>
          <h2 className={classes.sectionTitle}>Features</h2>
          <ul className={classes.featuresContent}>{features.map(renderFeature)}</ul>
        </div>
      </section>

      <section className={classes.team}>
        <div className={classNames([classes.sectionContainer, classes.teamContainer])}>
          <h2 className={classes.sectionTitle}>{t('ourTeam')}</h2>
          <div className={classes.teamContent}>
            {githubLinks.map((el) => (
              <div key={el.name} className={classes.welcomeCardsBlock}>
                <DeveloperCard {...el} />
              </div>
            ))}
          </div>
        </div>
      </section>

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
