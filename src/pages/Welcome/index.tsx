import { useTranslation } from 'react-i18next';
import btnClasses from '@src/styles/button.module.scss';
import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import DeveloperCard from './DeveloperCard';
import { developers } from '@src/shared/data/developers';
import { classNames } from '@src/shared/utils';
import { type Feature, features } from './features';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@src/shared/api/firebase';
import { Link } from 'react-router-dom';
import rsslogoSrc from '@src/assets/rsslogo-react.svg';

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
              {t('React course')}
            </a>
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
          <h2 className={classes.sectionTitle}>{t('featuresTitle')}</h2>
          <ul className={classes.featuresContent}>{features.map(renderFeature)}</ul>
        </div>
      </section>

      <section className={classes.team}>
        <div className={classNames([classes.sectionContainer, classes.teamContainer])}>
          <h2 className={classes.sectionTitle}>{t('ourTeam')}</h2>
          <ul className={classes.teamContent}>
            {developers.map((el) => (
              <DeveloperCard key={el.name} data={el} />
            ))}
          </ul>
        </div>
      </section>

      <section className={classes.school}>
        <div className={classNames([classes.sectionContainer, classes.schoolContainer])}>
          <div className={classes.schoolLogo}>
            <img src={rsslogoSrc} alt="RSSchool" />
          </div>
          <div className={classes.schoolContent}>{t('schoolDesc')}</div>
        </div>
      </section>

      <section className={classes.video}>
        <div className={classNames([classes.sectionContainer, classes.videoContainer])}>
          <div className={classes.sectionTitle}>{t('video')}</div>
          <div className={classes.videoContent}>
            <iframe
              src="https://www.youtube.com/embed/GNrdg3PzpJQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Welcome;
