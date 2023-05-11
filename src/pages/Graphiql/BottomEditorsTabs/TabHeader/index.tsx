import { classNames } from '@src/shared/utils';
import classes from '../style.module.scss';
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
      className={classNames([classes.tabHeader, isActive && classes.tabHeaderActive])}
    >
      {t(title)}
    </div>
  );
};

export default TabHeader;
