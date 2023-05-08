type BreakpointKeys = 'xs' | 'sm' | 'md' | 'lg';

const breakpoints: Record<BreakpointKeys, number> = {
  xs: 576,
  sm: 768,
  md: 1024,
  lg: 1200,
};

export const maxWidthQuery = (breakpointKey: BreakpointKeys) =>
  `(max-width: ${breakpoints[breakpointKey]}px)`;
