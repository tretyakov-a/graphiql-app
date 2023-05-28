import { Link } from 'react-router-dom';
import { logInWithEmailAndPassword } from '../../shared/api/firebase';
import classes from '@src/styles/auth.module.scss';
import { useTranslation } from 'react-i18next';
import { useInput } from '@src/shared/hooks/InputFormHooks';
import PageWrapper from '@src/components/PageWrapper';
import React from 'react';
import Loader from '@src/components/Loader';
import useLoading from '@src/shared/hooks/use-loading';

const Login = () => {
  const { t } = useTranslation();
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8, isPassword: true });
  const { loading, load } = useLoading();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    load(logInWithEmailAndPassword(email.value, password.value));
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
        <input
          type="password"
          name="password"
          className={classes.auth__textBox}
          value={password.value}
          onChange={(e) => password.onChange(e)}
          placeholder={t('Password') || ''}
          onBlur={() => password.onBlur()}
        />
        {password.isDirty && password.isError && (
          <div className={classes.auth__errorString}>{password.errorText}</div>
        )}
        <button
          disabled={email.isError || password.isError || loading}
          className={classes.auth__btn}
          type="submit"
        >
          {loading ? <Loader size="xs" /> : t('Login')}
        </button>
        <div>
          <Link to="/reset">{t('ForgotPassword') || ''}</Link>
        </div>
        <div>
          {t('DontHave') || ''} <Link to="/register">{t('Register') || ''}</Link>
        </div>
      </form>
    </PageWrapper>
  );
};

export default Login;
