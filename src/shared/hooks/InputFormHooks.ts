import { useState, ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Validations {
  isEmpty?: boolean;
  minLength?: number;
  isEmail?: boolean;
  isPassword?: boolean;
}

const useInput = (initialValue: string, validations: Validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

const useValidation = (value: string, validations: Validations) => {
  const [isError, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < (validations[validation] || Infinity) ? setError(true) : setError(false);
          value.length < (validations[validation] || Infinity)
            ? setErrorText(t('ItsShort') || '')
            : setErrorText('');
          break;
        case 'isEmpty':
          value ? setError(false) : setError(true);
          value ? setErrorText('') : setErrorText(t('ItEmpty') || '');
          break;
        case 'isEmail':
          const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          re.test(String(value).toLowerCase()) ? setError(false) : setError(true);
          re.test(String(value).toLowerCase())
            ? setErrorText('')
            : setErrorText(t('ItEmail') || '');
          break;
        case 'isPassword':
          const numbers = /[0-9]/;
          const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
          if (value.length < 8) {
            setError(true);
            setErrorText(t('longer') || '');
            if (!value.length) {
              setErrorText(t('ItEmpty') || '');
            }
          } else if (value === value.toLowerCase()) {
            setError(true);
            setErrorText(t('NeedCapital') || '');
          } else if (!symbols.test(value) || !numbers.test(value)) {
            setError(true);
            setErrorText(t('NeedSpecial') || '');
          }
          break;
      }
    }
  }, [t, validations, value]);

  return {
    isError,
    errorText,
  };
};

export { useValidation, useInput };
