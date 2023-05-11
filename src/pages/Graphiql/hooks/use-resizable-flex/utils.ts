import { DragOptions, MergedDragOptions } from './types';

export const mergeOptions = (options: DragOptions, defaultOptions: DragOptions) => {
  const result: DragOptions = {};
  const keys = Object.keys(defaultOptions) as (keyof DragOptions)[];
  keys.forEach((key) => (result[key] = { ...defaultOptions[key], ...options[key] }));
  return result as MergedDragOptions;
};
