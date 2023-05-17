import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { registerWithEmailAndPassword } from '../../shared/api/firebase';
import classes from './style.module.scss';
import '@src/styles/errorString.scss';
import { useInput } from '@src/shared/hooks/InputFormHooks';
import PageWrapper from '@src/components/PageWrapper';

function Register() {
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8, isPassword: true });
  const name = useInput('', { isEmpty: true, minLength: 3 });
  const { t } = useTranslation();
  const register = () => {
    if (!name) alert(t('PleaseEnterName'));
    registerWithEmailAndPassword(name.value, email.value, password.value);
  };

  return (
    <PageWrapper
      pageClassName={classes.register}
      pageContainerClassName={classes.register__pageContainer}
    >
      <div className={classes.register__container}>
        <input
          type="text"
          name="name"
          className={classes.register__textBox}
          value={name.value}
          onChange={(e) => name.onChange(e)}
          placeholder={t('FullName') || ''}
          onBlur={() => name.onBlur()}
        />
        {name.isDirty && name.isError && <div className="error-string">{name.errorText}</div>}
        <input
          type="text"
          name="email"
          className={classes.register__textBox}
          value={email.value}
          onChange={(e) => email.onChange(e)}
          placeholder={t('EmailAddress') || ''}
          onBlur={() => email.onBlur()}
        />
        {email.isDirty && email.isError && <div className="error-string">{email.errorText}</div>}
        <input
          type="password"
          name="password"
          className={classes.register__textBox}
          value={password.value}
          onChange={(e) => password.onChange(e)}
          placeholder={t('Password') || ''}
          onBlur={() => password.onBlur()}
        />
        {password.isDirty && password.isError && (
          <div className="error-string">{password.errorText}</div>
        )}
        <button
          disabled={email.isError || password.isError || name.isError}
          className={classes.register__btn}
          onClick={register}
        >
          {t('Register') || ''}
        </button>
        <div>
          {t('AlreadyHaveAnAccount') || ''} <Link to="/auth">{t('Login')}</Link>
        </div>
      </div>
    </PageWrapper>
  );
}
export default Register;
