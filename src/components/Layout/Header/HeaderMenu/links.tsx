import { faCode, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type LinkInfo = {
  to: string;
  langKey: string;
  icon: JSX.Element;
};

export const authorizedLinks: LinkInfo[] = [
  {
    to: '/graphiql',
    langKey: 'graphiql',
    icon: <FontAwesomeIcon icon={faCode} />,
  },
];

export const unauthorizedLinks: LinkInfo[] = [
  {
    to: '/auth',
    langKey: 'signIn',
    icon: <FontAwesomeIcon icon={faRightToBracket} />,
  },
  {
    to: '/register',
    langKey: 'signUp',
    icon: <FontAwesomeIcon icon={faUserPlus} />,
  },
];
