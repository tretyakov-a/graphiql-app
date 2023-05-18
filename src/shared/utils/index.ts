export const classNames = (classes: (string | boolean | undefined | null)[]) => {
  return classes.filter((className) => typeof className === 'string' && className !== '').join(' ');
};
