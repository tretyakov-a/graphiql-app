import { useTranslation } from 'react-i18next';
import classes from './style.module.scss';

interface Props {
  name: string;
  link: string;
}

const DeveloperCard = ({ name, link }: Props) => {
  const { t } = useTranslation('welcomeLocalisation');
  return (
    <a href={link} className={classes.developerCardLink}>
      {/* {imgSrc ?? <img src={imgSrc} alt={name} className={classes.developerCardImg} />} */}
      <h4 className={classes.developerCardHeader}>{t(`name.${name}`)}</h4>
      <p className={classes.developerCardDesc}>
        {name === 'Alexander Tretyakov' ? t(`role.Team lead`) : t(`role.Developer`)}
      </p>
    </a>
  );
};

export default DeveloperCard;
