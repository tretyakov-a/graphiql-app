import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, sendPasswordReset } from '../../shared/api/firebase';
import classes from './style.module.scss';
import '@src/styles/errorString.scss';
import { useTranslation } from 'react-i18next';
import { useInput } from '@src/shared/hooks/InputFormHooks';
import PageWrapper from '@src/components/PageWrapper';
import { toast } from 'react-toastify';

function Reset() {
  const { t } = useTranslation();
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (loading) return;
    } catch {
      return;
    }
  }, [user, loading, navigate]);
  return (
    <PageWrapper
      pageClassName={classes.reset}
      pageContainerClassName={classes.reset__pageContainer}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendPasswordReset(email.value).catch(() => toast(t('NotRegister'), { type: 'error' }));
        }}
        className={classes.reset__container}
      >
        <input
          type="text"
          name="email"
          className={classes.reset__textBox}
          value={email.value}
          onChange={(e) => email.onChange(e)}
          placeholder={t('EmailAddress') || ''}
          onBlur={() => email.onBlur()}
        />
        {email.isDirty && email.isError && <div className="error-string">{email.errorText}</div>}
        <button disabled={email.isError} className={classes.reset__btn} type="submit">
          {t('SendPasswordResetEmail') || ''}
        </button>
        <div>
          {t('DontHave') || ''} <Link to="/register">{t('Register')}</Link>
        </div>
      </form>
    </PageWrapper>
  );
}
export default Reset;
