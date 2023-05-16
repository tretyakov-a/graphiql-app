import React from 'react';
import { EditorsContext, useEditors } from '.';

const EditorsContextProvider = ({ children }: React.PropsWithChildren) => {
  const { editors, setEditorValue } = useEditors();
  return (
    <EditorsContext.Provider value={{ editors, setEditorValue }}>
      {children}
    </EditorsContext.Provider>
  );
};

export default EditorsContextProvider;
