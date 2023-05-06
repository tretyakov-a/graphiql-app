import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, registerWithEmailAndPassword } from '../../firebase';
import classes from './style.module.scss';
import { useInput } from '@src/shared/hooks/InputFormHooks';

function Register() {
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8, isPassword: true });
  const name = useInput('', { isEmpty: true, minLength: 3 });
  const [user, loading, error] = useAuthState(auth);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert(t('PleaseEnterName'));
    registerWithEmailAndPassword(name.value, email.value, password.value);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading, navigate]);

  return (
    <div className={classes.register}>
      <div className={classes.register__container}>
        {name.isDirty && name.isError && <div style={{ color: 'red' }}>{name.errorText}</div>}
        <input
          type="text"
          name="name"
          className={classes.register__textBox}
          value={name.value}
          onChange={(e) => name.onChange(e)}
          placeholder={t('FullName') || ''}
          onBlur={() => name.onBlur()}
        />
        {email.isDirty && email.isError && <div style={{ color: 'red' }}>{email.errorText}</div>}
        <input
          type="text"
          name="email"
          className={classes.register__textBox}
          value={email.value}
          onChange={(e) => email.onChange(e)}
          placeholder={t('EmailAddress') || ''}
          onBlur={() => email.onBlur()}
        />
        {password.isDirty && password.isError && (
          <div style={{ color: 'red' }}>{password.errorText}</div>
        )}
        <input
          type="password"
          name="password"
          className={classes.register__textBox}
          value={password.value}
          onChange={(e) => password.onChange(e)}
          placeholder={t('Password') || ''}
          onBlur={() => password.onBlur()}
        />
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
    </div>
  );
}
export default Register;
