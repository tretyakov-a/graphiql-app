import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../firebase';
import classes from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { useInput } from '@src/shared/hooks/InputFormHooks';

function Reset() {
  const { t } = useTranslation();
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading]);
  return (
    <div className={classes.reset}>
      <div className={classes.reset__container}>
        {email.isDirty && email.isError && <div style={{ color: 'red' }}>{email.errorText}</div>}
        <input
          type="text"
          name="email"
          className={classes.reset__textBox}
          value={email.value}
          onChange={(e) => email.onChange(e)}
          placeholder={t('EmailAddress') || ''}
          onBlur={() => email.onBlur()}
        />
        <button
          disabled={email.isError}
          className={classes.reset__btn}
          onClick={() => sendPasswordReset(email.value)}
        >
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
