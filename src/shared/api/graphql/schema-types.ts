type TypeKind =
  | 'OBJECT'
  | 'SCALAR'
  | 'UNION'
  | 'INTERFACE'
  | 'ENUM'
  | 'INPUT_OBJECT'
  | 'LIST'
  | 'NON_NULL';

type Deprecation = {
  isDeprecated: boolean;
  deprecationReason: string | null;
};

type NameDescription = {
  name: string | null;
  description?: string | null;
};

export type EnumValue = {
  name: TypeKind;
  description: string | null;
} & Deprecation;

export type InputValue = NameDescription & {
  type: TypeOfType | null;
  defaultValue: string | null;
};

type Directive = NameDescription & {
  isRepeatable: boolean | null;
  locations: string[];
  args: InputValue[];
};

export type Field = NameDescription & {
  args: InputValue[] | null;
  type: TypeOfType;
} & Deprecation;

export type Type = NameDescription & {
  type: TypeOfType;
  fields: Field[] | null;
  inputFields: InputValue[] | null;
  interfaces: Type[] | null;
  enumValues: EnumValue[] | null;
  possibleTypes: Type[] | null;
  ofType: Type | null;
};

export type TypeOfType = NameDescription & {
  kind: TypeKind;
  name: string | null;
  ofType: TypeOfType | null;
};

export type SchemaType = {
  queryType: Type;
  mutationType: Type | null;
  subscriptionType: Type | null;
  directives: Directive[];
  types: Type[];
};

export type GraphqlSchema = {
  __schema: SchemaType;
};
