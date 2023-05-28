import editorSrc from '@src/assets/features/code.svg';
import docsSrc from '@src/assets/features/docs.svg';
import authSrc from '@src/assets/features/lock.svg';

export type Feature = {
  name: string;
  description: string;
  iconSrc: string;
};

export const features: Feature[] = [
  {
    name: 'docs',
    description: 'docsDesc',
    iconSrc: docsSrc,
  },
  {
    name: 'editor',
    description: 'editorDesc',
    iconSrc: editorSrc,
  },
  {
    name: 'auth',
    description: 'authDesc',
    iconSrc: authSrc,
  },
];
