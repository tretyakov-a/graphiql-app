export type GraphqlError = {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
  extensions?: {
    code: string;
    timestamp?: string;
  };
};

export type GraphqlResponse<T> = {
  data?: T;
  errors?: GraphqlError[];
};
