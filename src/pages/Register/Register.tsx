import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../../shared/api/firebase';
import classes from '@src/styles/auth.module.scss';
import { useInput } from '@src/shared/hooks/InputFormHooks';
import PageWrapper from '@src/components/PageWrapper';
import { toast } from 'react-toastify';
import useLoading from '@src/shared/hooks/use-loading';
import Loader from '@src/components/Loader';

function Register() {
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8, isPassword: true });
  const name = useInput('', { isEmpty: true, minLength: 3 });
  const { t } = useTranslation();
  const { loading, load } = useLoading();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) toast(t('PleaseEnterName'), { type: 'error' });
    load(registerWithEmailAndPassword(name.value, email.value, password.value));
  };

  return (
    <PageWrapper pageClassName={classes.auth} pageContainerClassName={classes.auth__pageContainer}>
      <form onSubmit={handleSubmit} className={classes.auth__container}>
        <input
          type="text"
          name="name"
          className={classes.auth__textBox}
          value={name.value}
          onChange={(e) => name.onChange(e)}
          placeholder={t('FullName') || ''}
          onBlur={() => name.onBlur()}
        />
        {name.isDirty && name.isError && (
          <div className={classes.auth__errorString}>{name.errorText}</div>
        )}
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
          disabled={email.isError || password.isError || name.isError || loading}
          className={classes.auth__btn}
          type="submit"
        >
          {loading ? <Loader size="xs" /> : t('Register')}
        </button>
        <div>
          {t('AlreadyHaveAnAccount') || ''} <Link to="/auth">{t('Login')}</Link>
        </div>
      </form>
    </PageWrapper>
  );
}
export default Register;
