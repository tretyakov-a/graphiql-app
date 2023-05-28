import React, { useRef, useState } from 'react';

type MouseEventHandler = (e: React.MouseEvent) => void;

export interface MouseActionsContextProps {
  addClickHandler: (handler: MouseEventHandler) => void;
  removeClickHandler: (handler: MouseEventHandler) => void;
  setMouseUpHandler: React.Dispatch<React.SetStateAction<MouseEventHandler | null>>;
  setMouseMoveHandler: React.Dispatch<React.SetStateAction<MouseEventHandler | null>>;
}

const noop = () => {};

export const MouseActionsContext = React.createContext<MouseActionsContextProps>({
  addClickHandler: noop,
  removeClickHandler: noop,
  setMouseUpHandler: noop,
  setMouseMoveHandler: noop,
});

export const MouseActionsContextProvider = ({ children }: React.PropsWithChildren) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clickHandlers, setClickHandlers] = useState<Set<MouseEventHandler>>(() => new Set());
  const [mouseUpHandler, setMouseUpHandler] = useState<MouseEventHandler | null>(null);
  const [mouseMoveHandler, setMouseMoveHandler] = useState<MouseEventHandler | null>(null);

  const addClickHandler = (handler: MouseEventHandler) => {
    setClickHandlers((prev) => new Set(prev).add(handler));
  };

  const removeClickHandler = (handler: MouseEventHandler) => {
    setClickHandlers((prev) => {
      const next = new Set(prev);
      next.delete(handler);
      return next;
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    for (const handler of clickHandlers.values()) {
      handler(e);
    }
  };

  return (
    <MouseActionsContext.Provider
      value={{ addClickHandler, removeClickHandler, setMouseUpHandler, setMouseMoveHandler }}
    >
      <div
        id="mouse-actions-container"
        ref={containerRef}
        onClick={handleClick}
        onMouseUp={mouseUpHandler || undefined}
        onMouseMove={mouseMoveHandler || undefined}
      >
        {children}
      </div>
    </MouseActionsContext.Provider>
  );
};
