import classes from './style.module.scss';
import PageWrapper from '@src/components/PageWrapper';
import { githubLinks } from './github-links';
import DeveloperCard from './DeveloperCard';

const Welcome = () => {
  return (
    <PageWrapper pageClassName={classes.welcome}>
      <h2 className={classes.welcomeHeader}>Welcome</h2>
      <h3 className={classes.welcomeHeader}>Our Team</h3>
      <div className={classes.welcomeCardsConteiner}>
        {githubLinks.map((el) => (
          <div key={el.name} className={classes.welcomeCardsBlock}>
            <DeveloperCard {...el} />
          </div>
        ))}
      </div>
      <h3 className={classes.welcomeHeader}>Our Project</h3>
      <div className={classes.welcomeDesc}>
        <p>
          The application is developed for final task of{' '}
          <a href="https://rs.school/react/">React course</a>. GraphiQL is a playground/IDE for
          graphQL requests.
        </p>
        <p>Some more info about the app.</p>
      </div>
      <h3 className={classes.welcomeHeader}>Our School</h3>
      <div className={classes.welcomeDesc}>
        The Rolling Scopes School is free-of-charge and community-based education program conducted
        by The Rolling Scopes developer community since 2013. Everyone can study at RS School,
        regardless of age, professional employment, or place of residence. The mentors and trainers
        of our school are front-end and javascript developers from different companies and
        countries.
      </div>
    </PageWrapper>
  );
};

export default Welcome;
