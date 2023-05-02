import classes from './style.module.scss';

interface Props {
  name: string;
  role: string;
  link: string;
  imgSrc?: string;
}

const DeveloperCard = ({ name, role, link, imgSrc }: Props) => {
  return (
    <a href={link} className={classes.developerCardLink}>
      {imgSrc ?? <img src={imgSrc} alt={name} className={classes.developerCardImg} />}
      <h4 className={classes.developerCardHeader}>{name}</h4>
      <p className={classes.developerCardDesc}>{role}</p>
    </a>
  );
};

export default DeveloperCard;
