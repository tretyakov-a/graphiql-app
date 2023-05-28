import React from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: React.PropsWithChildren) => {
  const mount = document.getElementById('portal-root');

  return createPortal(children, mount || document.body);
};

export default Portal;
