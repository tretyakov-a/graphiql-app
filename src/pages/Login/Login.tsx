import { useEffect, useState, useTransition } from 'react';
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
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading]);
  return (
    <div className={classes.login}>
      <div className={classes.login__container}>
        <input
          type="text"
          className={classes.login__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('EmailAddress') || ''}
        />
        <input
          type="password"
          className={classes.login__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('Password') || ''}
        />
        <button
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
