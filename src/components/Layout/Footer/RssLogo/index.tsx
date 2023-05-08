import classes from './style.module.scss';
import rsslogoSrc from '@src/assets/rsslogo.svg';

const RssLogo = () => {
  return (
    <a
      className={classes.rssLogo}
      href="https://rs.school/react/"
      title="https://rs.school/react/"
      target="_blank"
      rel="noreferrer"
    >
      <img src={rsslogoSrc} alt="logo" />
    </a>
  );
};

export default RssLogo;
