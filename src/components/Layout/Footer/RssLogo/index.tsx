import classes from './style.module.scss';
import rsslogoSrc from '@src/assets/rsslogo.svg';

interface RssLogoPropsType {
  width: number;
}
const RssLogo = (props: RssLogoPropsType) => {
  return (
    <a
      className={classes.rssLogo}
      href="https://rs.school/react/"
      title="https://rs.school/react/"
      target="_blank"
      style={{ width: `${props.width}px` }}
      rel="noreferrer"
    >
      <img src={rsslogoSrc} alt="logo" />
    </a>
  );
};

export default RssLogo;
