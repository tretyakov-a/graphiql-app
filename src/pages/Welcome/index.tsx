import { useTranslation } from 'react-i18next';
import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import DeveloperCard from './DeveloperCard';
import { i18n } from '@src/shared/localization';
import { us, ru } from './localization/index';

i18n.addResourceBundle('us', 'translation', us);
i18n.addResourceBundle('ru', 'translation', ru);

const Welcome = () => {
  const { t } = useTranslation('translation');
  console.log(t('ourProject'));
  return (
    <PageWrapper pageClassName={classes.welcome}>
      <h2 className={classes.welcomeHeader}>{t('welcome')}</h2>
      <h3 className={classes.welcomeHeader}>{t('ourTeam')}</h3>
      <div className={classes.welcomeCardsConteiner}>
        {[0, 1, 2].map((el) => (
          <div key={t(`githubLinks.${el}.name`)} className={classes.welcomeCardsBlock}>
            <DeveloperCard
              name={t(`githubLinks.${el}.name`)}
              role={t(`githubLinks.${el}.role`)}
              link={t(`githubLinks.${el}.link`)}
              imgSrc={t(`githubLinks.${el}.imgSrc`) || undefined}
            />
          </div>
        ))}
      </div>
      <h3 className={classes.welcomeHeader}>{t('ourProject')}</h3>
      <div className={classes.welcomeDesc}>
        <p>
          {t('projectDesc1')} <a href="https://rs.school/react/">React course</a>.{' '}
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
