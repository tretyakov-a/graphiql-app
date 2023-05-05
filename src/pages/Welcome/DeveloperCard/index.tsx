import { useTranslation } from 'react-i18next';
import classes from './style.module.scss';

interface Props {
  name: string;
  link: string;
  role: string;
  imgSrc?: string | undefined;
}

const DeveloperCard = ({ name, link, role, imgSrc = 'avatar-placeholder.webp' }: Props) => {
  const { t } = useTranslation('welcomeLocalisation');
  const imgUrl = new URL(`/src/assets/images/${imgSrc}`, import.meta.url);
  return (
    <a href={link} className={classes.developerCardLink}>
      <div className={classes.developerCardContainer}>
        <div className={classes.developerCardCircle}>
          <img src={imgUrl.href} alt={name} className={classes.developerCardImg} />
        </div>
        <h4 className={classes.developerCardHeader}>{t(`name.${name}`)}</h4>
        <p className={classes.developerCardDesc}>{t(`role.${role}`)}</p>
      </div>
    </a>
  );
};

export default DeveloperCard;
