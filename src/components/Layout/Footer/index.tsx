import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import RssLogo from './RssLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { developers } from '@src/shared/data/developers';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={[generalClasses.container, classes.footerContainer].join(' ')}>
        <RssLogo />
        <ul className={classes.githubLinksList}>
          {developers.map(({ link, name }) => (
            <li key={name}>
              <a
                className={classes.githubLink}
                href={link}
                title={`${name}'s github`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className={classes.githubLinkIcon} icon={faGithub} />
                {name}
              </a>
            </li>
          ))}
        </ul>
        <div>2023</div>
      </div>
    </footer>
  );
};

export default Footer;
