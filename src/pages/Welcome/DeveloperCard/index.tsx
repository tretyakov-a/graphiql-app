import { useTranslation } from 'react-i18next';
import classes from './style.module.scss';
import { Developer } from '@src/shared/data/developers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import { classNames } from '@src/shared/utils';

interface Props {
  data: Developer;
}

const DeveloperCard = ({
  data: { name, github, discord, role, contribution, imgSrc = 'avatar-placeholder.webp' },
}: Props) => {
  const { t } = useTranslation('welcomeLocalisation');
  const imgUrl = new URL(`/src/assets/images/${imgSrc}`, import.meta.url);
  return (
    <li className={classes.developerCardContainer}>
      <div className={classes.developerCardCircle}>
        <img src={imgUrl.href} alt={name} className={classes.developerCardImg} />
      </div>
      <h3 className={classes.developerCardHeader}>{t(`name.${name}`)}</h3>
      <ul className={classes.developerCardContacts}>
        <li>
          <a
            className={classNames([classes.developerCardLink, classes.developerCardLinkDiscrod])}
            href={discord}
          >
            <span>
              <FontAwesomeIcon icon={faDiscord} size="lg" />
            </span>
          </a>
        </li>
        <li>
          <a className={classes.developerCardLink} href={github}>
            <span>
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </span>
          </a>
        </li>
      </ul>
      <p className={classes.developerCardDesc}>
        {t(`role.${role}`)}. {t(`${contribution}`)}
      </p>
    </li>
  );
};

export default DeveloperCard;
