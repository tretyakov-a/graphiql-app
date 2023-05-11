import { useState, createContext, useEffect, useMemo } from 'react';

type MatchesState = Record<string, boolean>;

export interface MediaQueryContextProps {
  matches: MatchesState | null;
}

export const MediaQueryContext = createContext<MediaQueryContextProps>({
  matches: null,
});

export const useMediaQuery = (queries: string[]) => {
  const mediaQueries = useMemo(
    () =>
      queries.reduce(
        (acc, query) => ({ ...acc, [query]: window.matchMedia(query) }),
        {} as Record<string, MediaQueryList>
      ),
    [queries]
  );

  const [matches, setMatches] = useState<MatchesState>(() => {
    return queries.reduce(
      (acc, query) => ({ ...acc, [query]: mediaQueries[query].matches }),
      {} as MatchesState
    );
  });

  useEffect(() => {
    const onChangeHandlers = queries.reduce(
      (acc, query) => ({
        ...acc,
        [query]: (e: MediaQueryListEvent) =>
          setMatches((prev) => ({ ...prev, [query]: e.matches })),
      }),
      {} as Record<string, (e: MediaQueryListEvent) => void>
    );

    queries.forEach((query) => {
      mediaQueries[query].addEventListener('change', onChangeHandlers[query]);
    });

    return () => {
      queries.forEach((query) => {
        mediaQueries[query].removeEventListener('change', onChangeHandlers[query]);
      });
    };
  }, [queries, mediaQueries]);

  return { matches };
};

export { maxWidthQuery } from './max-width-query';
