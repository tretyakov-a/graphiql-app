import { ChangeEvent, useState } from 'react';
import classes from './style.module.scss';
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleBlur = () => {
    setSearchValue('');
  };

  // const handleFocus = () => {
  //   setSearchValue('');
  // };

  return (
    <form>
      <input
        type="text"
        name="search"
        className={classes.SearchInput}
        value={searchValue}
        onChange={(e) => handleChange(e)}
        onBlur={() => handleBlur()}
        // onFocus={() => handleFocus()}
        placeholder={t('Search') || ''}
      />
    </form>
  );
};

export default SearchBar;
