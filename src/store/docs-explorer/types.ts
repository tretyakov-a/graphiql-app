import {
  Type,
  Field,
  TypeOfType,
  InputValue,
  EnumValue,
} from '@src/shared/api/graphql/schema-types';

export type DocsElement = {
  name?: string | null;
  description?: string | null;
  args?: InputValue[] | null;
  type?: TypeOfType;
  fields?: Field[] | null;
  inputFields?: InputValue[] | null;
  interfaces?: Type[] | null;
  enumValues?: EnumValue[] | null;
  possibleTypes?: Type[] | null;
  ofType?: Type | null;
  isDeprecated?: boolean | null;
};

export interface DocsExplorerState {
  docsExplorer: DocsElement[];
}
