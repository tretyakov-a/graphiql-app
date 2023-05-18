export type LinkInfo = {
  to: string;
  langKey: string;
};

export const authorizedLinks: LinkInfo[] = [
  {
    to: '/graphiql',
    langKey: 'graphiql',
  },
];

export const unauthorizedLinks: LinkInfo[] = [
  {
    to: '/auth',
    langKey: 'signIn',
  },
  {
    to: '/register',
    langKey: 'signUp',
  },
];
