import React from 'react';
import classes from './style.module.scss';
import generalClasses from '@src/styles/general.module.scss';
import { classNames } from '@src/shared/utils';

interface PageWrapperProps extends React.PropsWithChildren {
  pageClassName: string;
  pageContainerClassName?: string;
}

const PageWrapper = (props: PageWrapperProps) => {
  const { pageClassName, pageContainerClassName, children } = props;
  return (
    <main className={classNames([classes.page, pageClassName])}>
      <div className={classNames([generalClasses.container, pageContainerClassName])}>
        {children}
      </div>
    </main>
  );
};

export default PageWrapper;
