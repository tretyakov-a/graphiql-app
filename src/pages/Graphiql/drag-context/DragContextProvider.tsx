import { DragContext } from '.';

interface DragContextProvider extends React.PropsWithChildren {
  containerRef: React.RefObject<HTMLElement>;
}

const DragContextProvider = ({ children, containerRef }: DragContextProvider) => {
  return (
    <DragContext.Provider
      value={{
        containerRef,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

export default DragContextProvider;
