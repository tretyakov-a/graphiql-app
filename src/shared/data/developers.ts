export type Developer = {
  github: string;
  discord: string;
  name: string;
  role: string;
  contribution: string;
  imgSrc: string;
};

export const developers: Developer[] = [
  {
    github: 'https://github.com/tretyakov-a',
    discord: 'https://discordapp.com/users/228548840045674496',
    name: 'Alexander Tretyakov',
    role: 'Team lead',
    contribution: 'contribution.alexander',
    imgSrc: 'alexander.webp',
  },
  {
    github: 'https://github.com/PetrAlexkulakov',
    discord: 'https://discordapp.com/users/756062797221068951',
    name: 'Petr Kulakov',
    role: 'Developer',
    contribution: 'contribution.petr',
    imgSrc: 'petr.jfif',
  },
  {
    github: 'https://github.com/terra456',
    discord: 'https://discordapp.com/users/650773626064207884',
    name: 'Olga Bainova',
    role: 'Developer',
    contribution: 'contribution.olga',
    imgSrc: 'olga.jpeg',
  },
];
