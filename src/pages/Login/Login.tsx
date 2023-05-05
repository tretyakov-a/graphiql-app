import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './style.module.scss';
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
  // const [isEmpty, setEmpty] = useState(true);
  // const [minLengthError, setMinLengthError] = useState(false);
  // const [emailError, setEmailError] = useState(false);
  // const [passwordError, setPasswordError] = useState('');
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

const Login = () => {
  const { t } = useTranslation();
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8, isPassword: true });
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [emailDirty, setEmailDirty] = useState(false);
  // const [passwordDirty, setPasswordDirty] = useState(false);
  // const [emailError, setEmailError] = useState('Wrong E-mail');
  // const [passwordError, setPasswordError] = useState('Wrong password');
  // const [formValid, setFormValid] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  // const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  //   const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //   if (!re.test(String(e.target.value).toLowerCase())) {
  //     setEmailError('Wrong E-mail');
  //   } else {
  //     setEmailError('');
  //   }
  // };

  // const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   const ourPass = e.target.value;
  //   const numbers = /[0-9]/;
  //   const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
  //   setPassword(ourPass);
  //   if (ourPass.length < 8) {
  //     setPasswordError('The password must be 8 or more characters long');
  //     if (!ourPass.length) {
  //       setPasswordError('The password can`t be empty');
  //     }
  //   } else if (ourPass === ourPass.toLowerCase()) {
  //     setPasswordError('Need at least one capital letter');
  //   } else if (!symbols.test(ourPass) || !numbers.test(ourPass)) {
  //     setPasswordError('The password must contain numbers and a special character');
  //   } else {
  //     setPasswordError('');
  //   }
  // };

  // const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
  //   switch (e.target.name) {
  //     case 'email':
  //       setEmailDirty(true);
  //       break;
  //     case 'password':
  //       setPasswordDirty(true);
  //       break;
  //   }
  // };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading]);

  // useEffect(() => {
  //   if (emailError || passwordError) {
  //     setFormValid(false);
  //   } else {
  //     setFormValid(true);
  //   }
  // }, [emailError, passwordError]);
  return (
    <div className={classes.login}>
      <div className={classes.login__container}>
        {email.isDirty && email.isError && <div style={{ color: 'red' }}>{email.errorText}</div>}
        <input
          type="text"
          name="email"
          className={classes.login__textBox}
          value={email.value}
          onChange={(e) => email.onChange(e)}
          placeholder={t('EmailAddress') || ''}
          onBlur={() => email.onBlur()}
        />
        {password.isDirty && password.isError && (
          <div style={{ color: 'red' }}>{password.errorText}</div>
        )}
        <input
          type="password"
          name="password"
          className={classes.login__textBox}
          value={password.value}
          onChange={(e) => password.onChange(e)}
          placeholder={t('Password') || ''}
          onBlur={() => password.onBlur()}
        />
        <button
          disabled={email.isError || password.isError}
          className={classes.login__btn}
          onClick={() => signInWithEmailAndPassword(auth, email.value, password.value)}
        >
          {t('Login') || ''}
        </button>
        <div>
          <Link to="/reset">{t('ForgotPassword') || ''}</Link>
        </div>
        <div>
          {t('DontHave') || ''} <Link to="/register">{t('Register') || ''}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
