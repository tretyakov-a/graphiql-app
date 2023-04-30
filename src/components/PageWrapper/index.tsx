import React from 'react';
import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';

interface PageWrapperProps extends React.PropsWithChildren {
  pageClassName: string;
  pageContainerClassName?: string;
}

const PageWrapper = (props: PageWrapperProps) => {
  const { pageClassName, pageContainerClassName, children } = props;
  return (
    <main className={[classes.page, pageClassName].join(' ')}>
      <div className={[generalClasses.container, pageContainerClassName || ''].join(' ')}>
        {children}
      </div>
    </main>
  );
};

export default PageWrapper;
