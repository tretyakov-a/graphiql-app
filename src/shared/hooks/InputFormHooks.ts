import { useState, ChangeEvent, useEffect } from 'react';

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

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < (validations[validation] || Infinity) ? setError(true) : setError(false);
          value.length < (validations[validation] || Infinity)
            ? setErrorText('It is too short')
            : setErrorText('');
          break;
        case 'isEmpty':
          value ? setError(false) : setError(true);
          value ? setErrorText('') : setErrorText('It can`t be empty');
          break;
        case 'isEmail':
          const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          re.test(String(value).toLowerCase()) ? setError(false) : setError(true);
          re.test(String(value).toLowerCase()) ? setErrorText('') : setErrorText('It isn`t E-mail');
          break;
        case 'isPassword':
          const numbers = /[0-9]/;
          const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
          if (value.length < 8) {
            setError(true);
            setErrorText('The password must be 8 or more characters long');
            if (!value.length) {
              setErrorText('The password can`t be empty');
            }
          } else if (value === value.toLowerCase()) {
            setError(true);
            setErrorText('Need at least one capital letter');
          } else if (!symbols.test(value) || !numbers.test(value)) {
            setError(true);
            setErrorText('The password must contain numbers and a special character');
          }
          break;
      }
    }
  }, [value]);

  return {
    isError,
    errorText,
  };
};

export { useValidation, useInput };
