export type GraphqlError = {
  message: string;
  location: { line: number; column: number }[];
  path?: (string | number)[];
  extensions: {
    code: string;
    timestamp?: string;
  };
};

export type GraphqlResponse<T> = {
  data?: T;
  errors?: GraphqlError[];
};
