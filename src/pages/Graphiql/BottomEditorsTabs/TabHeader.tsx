import classes from './style.module.scss';
import { useTranslation } from 'react-i18next';

interface TabHeaderProps {
  isActive: boolean;
  onClick: () => void;
  title: string;
}

const TabHeader = ({ isActive, onClick, title }: TabHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div
      onClick={onClick}
      className={[classes.tabHeader, isActive && classes.tabHeaderActive].join(' ')}
    >
      {t(title)}
    </div>
  );
};

export default TabHeader;
