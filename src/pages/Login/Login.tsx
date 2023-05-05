import { ChangeEvent, FocusEvent, useEffect, useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './style.module.scss';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState('Wrong E-mail');
  const [passwordError, setPasswordError] = useState('Wrong password');
  const [formValid, setFormValid] = useState(false);

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Wrong E-mail');
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const ourPass = e.target.value;
    const numbers = /[0-9]/;
    const symbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
    setPassword(ourPass);
    if (ourPass.length < 8) {
      setPasswordError('The password must be 8 or more characters long');
      if (!ourPass.length) {
        setPasswordError('The password can`t be empty');
      }
    } else if (ourPass === ourPass.toLowerCase()) {
      setPasswordError('Need at least one capital letter');
    } else if (!symbols.test(ourPass) || !numbers.test(ourPass)) {
      setPasswordError('The password must contain numbers and a special character');
    } else {
      setPasswordError('');
    }
  };

  const blurHandler = (e: FocusEvent<HTMLInputElement, Element>) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading]);

  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);
  return (
    <div className={classes.login}>
      <div className={classes.login__container}>
        {emailDirty && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        <input
          type="text"
          name="email"
          className={classes.login__textBox}
          value={email}
          onChange={(e) => emailHandler(e)}
          placeholder={t('EmailAddress') || ''}
          onBlur={(e) => blurHandler(e)}
        />
        {passwordDirty && passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        <input
          type="password"
          name="password"
          className={classes.login__textBox}
          value={password}
          onChange={(e) => passwordHandler(e)}
          placeholder={t('Password') || ''}
          onBlur={(e) => blurHandler(e)}
        />
        <button
          disabled={!formValid}
          className={classes.login__btn}
          onClick={() => signInWithEmailAndPassword(auth, email, password)}
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
