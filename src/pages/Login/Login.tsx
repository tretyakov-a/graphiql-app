import { Link } from 'react-router-dom';
import { auth } from '../../shared/api/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import classes from './style.module.scss';
import '@src/styles/errorString.scss';
import { useTranslation } from 'react-i18next';
import { useInput } from '@src/shared/hooks/InputFormHooks';
import PageWrapper from '@src/components/PageWrapper';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '@src/components/Loader';

const Login = () => {
  const { t } = useTranslation();
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 8, isPassword: true });
  const [, loading] = useAuthState(auth);

  return (
    <PageWrapper
      pageClassName={classes.login}
      pageContainerClassName={classes.login__pageContainer}
    >
      <div className={classes.login__container}>
        <input
          type="text"
          name="email"
          className={classes.login__textBox}
          value={email.value}
          onChange={(e) => email.onChange(e)}
          placeholder={t('EmailAddress') || ''}
          onBlur={() => email.onBlur()}
        />
        {email.isDirty && email.isError && <div className="error-string">{email.errorText}</div>}
        <input
          type="password"
          name="password"
          className={classes.login__textBox}
          value={password.value}
          onChange={(e) => password.onChange(e)}
          placeholder={t('Password') || ''}
          onBlur={() => password.onBlur()}
        />
        {password.isDirty && password.isError && (
          <div className="error-string">{password.errorText}</div>
        )}
        <button
          disabled={email.isError || password.isError || loading}
          className={classes.login__btn}
          onClick={() => {
            signInWithEmailAndPassword(auth, email.value, password.value).catch(() =>
              alert(t('CheckEOrP'))
            );
          }}
        >
          {loading ? <Loader /> : t('Login') || ''}
        </button>
        <div>
          <Link to="/reset">{t('ForgotPassword') || ''}</Link>
        </div>
        <div>
          {t('DontHave') || ''} <Link to="/register">{t('Register') || ''}</Link>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;
