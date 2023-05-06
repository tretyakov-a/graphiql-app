import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../firebase';
import classes from './style.module.scss';
import { useTranslation } from 'react-i18next';
import { useInput } from '@src/shared/hooks/InputFormHooks';
import PageWrapper from '@src/components/PageWrapper';

function Reset() {
  const { t } = useTranslation();
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (loading) return;
      if (user) navigate('/');
    } catch {
      return;
    }
  }, [user, loading, navigate]);
  return (
    <PageWrapper
      pageClassName={classes.reset}
      pageContainerClassName={classes.reset__pageContainer}
    >
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
          onClick={() => {
            sendPasswordReset(email.value).catch(() => alert(t('NotRegister')));
          }}
        >
          {t('SendPasswordResetEmail') || ''}
        </button>
        <div>
          {t('DontHave') || ''} <Link to="/register">{t('Register')}</Link>
        </div>
      </div>
    </PageWrapper>
  );
}
export default Reset;
