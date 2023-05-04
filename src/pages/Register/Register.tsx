import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import classes from './style.module.scss';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const { t } = useTranslation();
  const register = () => {
    if (!name) alert(t('PleaseEnterName'));
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
  }, [user, loading]);
  return (
    <div className={classes.register}>
      <div className={classes.register__container}>
        <input
          type="text"
          className={classes.register__textBox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('FullName') || ''}
        />
        <input
          type="text"
          className={classes.register__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('EmailAddress') || ''}
        />
        <input
          type="password"
          className={classes.register__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('Password') || ''}
        />
        <button className={classes.register__btn} onClick={register}>
          {t('Register') || ''}
        </button>
        <div>
          {t('AlreadyHaveAnAccount') || ''} <Link to="/auth">{t('Login')}</Link>
        </div>
      </div>
    </div>
  );
}
export default Register;
