import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import RssLogo from './RssLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { developers } from '@src/shared/data/developers';
import { useTranslation } from 'react-i18next';
import { classNames } from '@src/shared/utils';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation('welcomeLocalisation');
  const location = useLocation();

  const isGraphqlPage = location.pathname.includes('graphiql');

  const footerContainerClasses = classNames([
    generalClasses.container,
    classes.footerContainer,
    !isGraphqlPage && classes.footerContainerBounded,
  ]);

  return (
    <footer className={classes.footer}>
      <div className={footerContainerClasses}>
        <div className={classes.footerLeft}>
          <RssLogo />
          <div className={classes.footerYear}>2023</div>
        </div>
        <ul className={classes.githubLinksList}>
          {developers.map(({ github, name }) => (
            <li key={name}>
              <a
                className={classes.githubLink}
                href={github}
                title={`${name}'s github`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className={classes.githubLinkIcon} icon={faGithub} />
                {t(`name.${name}`)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
