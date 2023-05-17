import { useReducer } from 'react';

function useStateHistory<T>(initialValue?: T): [T | undefined, (state: T) => void, () => void] {
  const reducer = (oldState: T[], action: { type: string; payload: T | undefined }): Array<T> => {
    switch (action.type) {
      case 'add':
        if (action.payload) {
          return [...oldState, action.payload];
        }
        return oldState;
      case 'delite':
        if (oldState.length > 0) {
          return oldState.slice(0, oldState.length - 1);
        } else {
          return [];
        }
      default:
        return oldState;
    }
  };

  const [allStates, setState] = useReducer(
    reducer,
    initialValue !== undefined ? [initialValue as T] : []
  );

  const currentState = allStates[allStates.length - 1];

  const addState = (el: T) => {
    setState({ type: 'add', payload: el });
  };

  const backState = () => {
    setState({ type: 'delite', payload: undefined });
  };

  return [currentState, addState, backState];
}

export default useStateHistory;
