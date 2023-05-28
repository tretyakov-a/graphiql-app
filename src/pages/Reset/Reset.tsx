import { Link } from 'react-router-dom';
import { sendPasswordReset } from '../../shared/api/firebase';
import classes from '@src/styles/auth.module.scss';
import { useTranslation } from 'react-i18next';
import { useInput } from '@src/shared/hooks/InputFormHooks';
import PageWrapper from '@src/components/PageWrapper';
import useLoading from '@src/shared/hooks/use-loading';
import React from 'react';
import Loader from '@src/components/Loader';

function Reset() {
  const { t } = useTranslation();
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });

  const { loading, load } = useLoading();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    load(sendPasswordReset(email.value));
  };

  return (
    <PageWrapper pageClassName={classes.auth} pageContainerClassName={classes.auth__pageContainer}>
      <form onSubmit={handleSubmit} className={classes.auth__container}>
        <input
          type="text"
          name="email"
          className={classes.auth__textBox}
          value={email.value}
          onChange={(e) => email.onChange(e)}
          placeholder={t('EmailAddress') || ''}
          onBlur={() => email.onBlur()}
        />
        {email.isDirty && email.isError && (
          <div className={classes.auth__errorString}>{email.errorText}</div>
        )}
        <button disabled={email.isError || loading} className={classes.auth__btn} type="submit">
          {loading ? <Loader size="xs" /> : t('SendPasswordResetEmail')}
        </button>
        <div>
          {t('DontHave') || ''} <Link to="/register">{t('Register')}</Link>
        </div>
      </form>
    </PageWrapper>
  );
}
export default Reset;
