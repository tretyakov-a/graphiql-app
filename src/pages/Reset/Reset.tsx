import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../firebase';
import classes from './style.module.scss';
import { useTranslation } from 'react-i18next';

function Reset() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading]);
  return (
    <div className={classes.reset}>
      <div className={classes.reset__container}>
        <input
          type="text"
          className={classes.reset__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('EmailAddress') || ''}
        />
        <button className={classes.reset__btn} onClick={() => sendPasswordReset(email)}>
          {t('SendPasswordResetEmail') || ''}
        </button>
        <div>
          {t('DontHave') || ''} <Link to="/register">{t('Register')}</Link>
        </div>
      </div>
    </div>
  );
}
export default Reset;
